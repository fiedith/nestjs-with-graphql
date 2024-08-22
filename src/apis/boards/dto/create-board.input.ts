import { Field, InputType } from '@nestjs/graphql';

@InputType() // graphql decorator to mark this as GraphQL 'input' ('input' = input type)
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
