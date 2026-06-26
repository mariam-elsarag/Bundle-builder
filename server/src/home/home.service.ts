import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { HomeStepsResponseDto } from './dto/home-response.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getProductsByCategories() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product')
      .leftJoinAndSelect('product.variants', 'variant')
      .orderBy('category.order', 'ASC')
      .addOrderBy('product.createdAt', 'ASC')
      .addOrderBy('variant.id', 'ASC')
      .getMany();

    return plainToInstance(HomeStepsResponseDto, categories, {
      excludeExtraneousValues: true,
    });
  }
}
