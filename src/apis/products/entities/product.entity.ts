import { ProductCategory } from 'src/apis/productsCategories/entities/productsCategories.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productsSalesLocations.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productsTags.entity';
import { User } from 'src/apis/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  // items on registration is not soldout by default
  @Column({ default: false })
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable() // 다대다 관계에서 중간테이블을 생성해주는 어노테이션
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
