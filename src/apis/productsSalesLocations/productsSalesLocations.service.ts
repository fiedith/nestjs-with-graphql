import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSalesLocation } from './entities/productsSalesLocations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSalesLocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationsRepository: Repository<ProductSalesLocation>,
  ) {}

  async create({ productSalesLocation }) {
    return this.productSalesLocationsRepository.save({
      ...productSalesLocation,
    });
  }
}
