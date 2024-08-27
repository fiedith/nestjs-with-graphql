import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSalesLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  // latitude, longitude values are of max 9 digits with 6 digits decimal
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  // latitude, longitude values are of max 9 digits with 6 digits decimal
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude: number;

  @Column()
  meetingTime: Date;
}
