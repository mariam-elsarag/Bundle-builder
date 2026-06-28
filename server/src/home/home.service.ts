import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Steps } from 'src/common/utils/enum';
import { PackageResponseDto } from 'src/package/dto/package-response.dto';
import { Package } from 'src/package/entities/package.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { HomeStepResponseDto } from './dto/home-response.dto';
import { HomeStep } from './entities/step.entities';
import { ProductResponseDto } from 'src/products/dto/product-response.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeStep)
    private readonly stepRepository: Repository<HomeStep>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}
  async getHome() {
    const steps = await this.stepRepository.find({
      order: {
        order: 'ASC',
        products: {
          variants: {
            id: 'ASC',
          },
        },
        packages: {
          features: {
            order: 'ASC',
          },
        },
      },
      relations: {
        products: {
          variants: true,
        },
        packages: {
          features: true,
        },
      },
    });

    return plainToInstance(HomeStepResponseDto, steps, {
      excludeExtraneousValues: true,
    });
  }
}
