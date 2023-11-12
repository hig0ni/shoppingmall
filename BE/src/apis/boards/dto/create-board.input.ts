import { Field, InputType } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Min(0)
  @Field(() => String)
  contents: string;
}
