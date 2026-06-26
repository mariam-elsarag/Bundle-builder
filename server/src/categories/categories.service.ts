import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async createOrUpdate(body: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: body.name },
    });

    if (category) {
      Object.assign(category, body);
      return this.categoryRepository.save(category);
    }
    const lastCategory = await this.categoryRepository.findOne({
      order: {
        order: 'DESC',
      },
    });

    const newCategory = this.categoryRepository.create({
      ...body,
      order: lastCategory ? lastCategory.order + 1 : 1,
    });

    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
