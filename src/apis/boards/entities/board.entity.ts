import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // typeorm decorator for database
@ObjectType() // graphql decorator to mark this object as GraphQL 'type' ('type' = return type)
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int) // specifies GraphQL type
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
