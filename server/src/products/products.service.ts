import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { HomeStep } from 'src/home/entities/step.entities';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Variant } from './entities/variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly prodcutRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly productVariantRepository: Repository<Variant>,

    @InjectRepository(HomeStep)
    private readonly setpRepository: Repository<HomeStep>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { variants, stepId, ...productData } = createProductDto;

    const step = await this.setpRepository.findOne({
      where: { id: stepId },
    });
    if (!step) {
      throw new NotFoundException('Step Id not found ');
    }
    const product = await this.prodcutRepository.save({
      ...productData,
      step: step,
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
