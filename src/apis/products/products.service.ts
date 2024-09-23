import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceFindOne,
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSalesLocation', 'productCategory'], // joins productSalesLocation and productCategory table
    });
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory'], // joins productSalesLocation table
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // Save productSalesLocation
    const location = await this.productsSalesLocationsService.create({
      productSalesLocation,
    });

    // Process product tags
    const tagNames = productTags.map((el) => el.replace('#', ''));

    // Find existing tags
    const existingTags = await this.productsTagsService.findByNames({
      tagNames,
    });

    // Identify new tags to insert
    const newTagNames = tagNames.filter(
      (name) => !existingTags.some((tag) => tag.name === name),
    );

    // Insert new tags
    let newTags = [];
    if (newTagNames.length > 0) {
      const result = await this.productsTagsService.bulkInsert({
        names: newTagNames.map((name) => ({ name })),
      });

      // Fetch newly inserted tags
      newTags = await this.productsTagsService.findByNames({
        tagNames: newTagNames,
      });
    }

    // Combine existing and new tags
    const allTags = [...existingTags, ...newTags];

    // Save product with relations
    const result = await this.productsRepository.save({
      ...product,
      productSalesLocation: location,
      productCategory: { id: productCategoryId },
      productTags: allTags, // Must be full entities, not just identifiers
    });

    return result;
  }

  // validate whether product is soldout or not
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('Product already soldout');
    }
  }

  // repository.save 는 기존에 id가 없다면 등록, 기존에 id가 존재한다면 수정으로 작용하며 결과를 객체로 돌려받는다
  // 이떄 수정된 내용만 객체에 담는다
  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // Find the product
    const product = await this.findOne({ productId });
    this.checkSoldout({ product });

    const { productTags, productSalesLocation, ...updateData } =
      updateProductInput;

    // Handle productTags update (convert string tags to ProductTag entities)
    let updatedTags = [];
    if (productTags) {
      const tagNames = productTags.map((tag) => tag.replace('#', ''));
      const existingTags = await this.productsTagsService.findByNames({
        tagNames,
      });

      // Find or create new tags
      const newTagNames = tagNames.filter(
        (name) => !existingTags.some((tag) => tag.name === name),
      );

      if (newTagNames.length > 0) {
        const newTags = await this.productsTagsService.bulkInsert({
          names: newTagNames.map((name) => ({ name })),
        });

        // Fetch newly created tags
        const fetchedNewTags = await this.productsTagsService.findByNames({
          tagNames: newTagNames,
        });

        updatedTags = [...existingTags, ...fetchedNewTags];
      } else {
        updatedTags = existingTags;
      }
    }

    // Handle productSalesLocation update (resolve entity if necessary)
    let updatedLocation = product.productSalesLocation; // default to existing location
    if (productSalesLocation) {
      updatedLocation = await this.productsSalesLocationsService.create({
        productSalesLocation,
      });
    }

    // Save the updated product
    const result = await this.productsRepository.save({
      ...product, // original product data
      ...updateData, // updated fields
      productSalesLocation: updatedLocation, // updated location entity
      productTags: updatedTags.length > 0 ? updatedTags : product.productTags, // updated tags or keep existing ones
    });

    return result as Product;
  }

  // Repository.delete()는 db에서 실제로 없애버리므로 soft delete하기
  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
