import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { productsSaleslocationInput } from 'src/apis/productsSaleslocations/dto/product-saleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => productsSaleslocationInput)
  productsSaleslocation: productsSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}
