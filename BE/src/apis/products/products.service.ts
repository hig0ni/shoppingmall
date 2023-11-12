import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceFindOne,
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSaleslocationsService: ProductsSaleslocationService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    //  // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    //   하나 하나 직접 나열하는 방식
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const {
      productsSaleslocation,
      productCategoryId,
      productTags,
      ...product
    } = createProductInput;

    // 2-1) 상품거래위치 등록
    // 바로 저장하지 않고 서비스를 타고 가야 하는 이유는 ??
    // 레파지토리에 직접 접근하면 검증 로직을 통일 시킬 수 없음
    const result = await this.productsSaleslocationsService.create({
      productsSaleslocation,
    });

    // 2-2) 상품태그 등록
    // productTags가 ["#전자제품", "#영등포", "#컴퓨터"]와 같은 패턴이라고 가정
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });

    // bulk-insert는 save()로는 불가능
    const newTags = await this.productsTagsService.bulkInsert({ names: temp });
    const tags = [...prevTags, ...newTags.identifiers];

    const result2 = this.productsRepository.save({
      ...product,
      productsSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약에, name 까지 받고 싶으면?
        // => createProductInput에 name 까지 포함해서 받아오기
      },
      productTags: tags,
    });

    // // 하나 하나 직접 나열하는 방식
    // name: product.name,
    // description: product.description,
    // price: product.price,
    // producSaleslocation: {
    //   id: result.id.
    // }

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<void> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldout({ product });

    // this.productsRepository.create; // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    // 숙제-1) 왜 아래 에러가 발생하는지 고민해보기
    // 숙제-2) 아래 에러 고쳐보기
    //   const result = this.productsRepository.save({
    //     ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
    //     ...updateProductInput,
    //   });
    //   return result;
  }

  // 1. checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted(ex. 고객 히스토리 관리를 위해 우리끼리 삭제했다고 판단. 진짜 삭제X)
    // this.productsRepository.update({ id: productId }. { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt(초기값은 비워두고, 값이 있으면 삭제된 것)
    // this.productsRepository.update({ id: productId }. { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // 장점: 여러 ID 한번에 지우기 가능 .softRemove([{id: qqq}, {id: aaa}, {id: zzz}])
    // 단점: id로만 삭제 가능
    // this.productsRepository.softRemove({ id: productId });

    // 4. 소프트 삭제(TypeORM 제공) - softDelete
    // 장점: id말고 다른 컬럼으로도 삭제 가능
    // 단점: 한번에 1개씩만 지우기 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
