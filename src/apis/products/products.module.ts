import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productsSalesLocations.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productsTags.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation,
      ProductTag,
    ]),
  ],

  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSalesLocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
