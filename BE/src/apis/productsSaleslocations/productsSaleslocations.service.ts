import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productSaleslocation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsSaleslocationService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ productsSaleslocation }) {
    return this.productsSaleslocationsRepository.save({
      ...productsSaleslocation,
    });
  }
}
