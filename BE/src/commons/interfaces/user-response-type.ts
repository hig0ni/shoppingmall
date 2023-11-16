import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserResponseType {
  @Field(() => String)
  nickname?: string;

  @Field(() => Int)
  isAuth?: number;

  @Field(() => Int)
  isAdmin?: number;
}
