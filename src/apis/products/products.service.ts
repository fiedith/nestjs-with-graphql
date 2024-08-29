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
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
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
    const product = await this.findOne({ productId });
    this.checkSoldout({ product });

    // this.productsRepository.create();  // DB 접속과 무관하게 등록을 위한 객체 생성
    // this.productsRepository.insert();  // 등록이지만 등록 결과를 객체로 못 돌려 받음
    // this.productsRepository.update();  // 수정이지만 수정 결과를 객체로 못 돌려 받음
    const result = this.productsRepository.save({
      ...product, // 수정되지 않은 내용까지 객체에 담기
      ...updateProductInput, // 수정된 내용
    });
    return result;
  }

  // Repository.delete()는 db에서 실제로 없애버리므로 soft delete하기
  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
