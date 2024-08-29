import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

/**상품 update에는 CreateProductInput과 동일한 내용의 타입을 DTO로 활용해야 함
 * 따라서 동일한 내용을 중복 작성할 필요 없이 extend하며, 생성시에는 각 항목이 nullable=false인 반면
 * update시에는 항목들이 nullable해야 하므로 TS utility type 활용하기
 * 대신, 이 경우 graphql 타입으로 활용해야 하므로 Partial<T>이 아닌 PartialType(T) 활용
 */
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
