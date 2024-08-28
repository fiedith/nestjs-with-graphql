import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSalesLocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  // latitude, longitude values are of max 9 digits with 6 digits decimal
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  latitude: number;

  // latitude, longitude values are of max 9 digits with 6 digits decimal
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  longitude: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
