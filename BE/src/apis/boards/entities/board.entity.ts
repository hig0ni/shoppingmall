import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //typeorm을 위한 decorator
@ObjectType() //graphql을 위한 decorator
export class Board {
  @PrimaryGeneratedColumn('increment') //typeorm을 위한 decorator
  @Field(() => Int) //graphql을 위한 decorator
  number: number;

  @Column() //typeorm을 위한 decorator
  @Field(() => String) //graphql을 위한 decorator
  writer: string;

  @Column() //typeorm을 위한 decorator
  @Field(() => String) //graphql을 위한 decorator
  title: string;

  @Column() //typeorm을 위한 decorator
  @Field(() => String) //graphql을 위한 decorator
  contents: string;
}
