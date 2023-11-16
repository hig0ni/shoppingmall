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
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) // 비밀번호는 브라우저에 전달하지 않음
  password: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ default: 0 })
  @Field(() => Int)
  isAuth: number;

  @Column({ default: 0 })
  @Field(() => Int)
  isAdmin: number;
}
