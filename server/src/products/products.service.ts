import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly prodcutRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly productVariantRepository: Repository<Variant>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { variants, categoryId, ...productData } = createProductDto;

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category Id not found ');
    }
    const product = await this.prodcutRepository.save({
      ...productData,
      category: category,
    });

    if (variants?.length) {
      const productVariants = variants.map((variant) =>
        this.productVariantRepository.create({
          ...variant,
          product,
        }),
      );

      await this.productVariantRepository.save(productVariants);
    }

    const products = await this.prodcutRepository.findOne({
      where: { id: product.id },
    });
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
