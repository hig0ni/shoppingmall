import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Boolean)
  isSoldout: boolean;

  @Column()
  @Field(() => String)
  url: string;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // @CreateDateColumn() // 데이터 등록시 등록시간 자동으로 추가
  // createdAt: Date;

  // @UpdateDateColumn() // 데이터 수정시 수정시간 자동으로 추가
  // updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
