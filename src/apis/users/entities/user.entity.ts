import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  // Field 데코레이터는 GraphQL타입으로 브라우저(frontend)와 주고받기 위한 타입을 명시하는 것임
  // 이때 비밀번호를 브라우저에 전달하면 안되므로 해당 데코레이터는 제외시켜야 함
  @Column()
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;
}
