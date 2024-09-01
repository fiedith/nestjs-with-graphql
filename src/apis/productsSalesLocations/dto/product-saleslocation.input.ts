import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productsSalesLocations.entity';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSalesLocation,
  ['id'], // omit out id field
  InputType, // turn into InputType from ObjectType
) {}
