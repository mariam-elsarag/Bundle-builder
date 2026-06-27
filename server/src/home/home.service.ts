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
      order: { order: 'ASC' },
    });

    const [products, packages] = await Promise.all([
      this.productRepository.find({
        relations: { variants: true, category: true },
        order: { variants: { id: 'ASC' } },
      }),
      this.packageRepository.find({
        relations: { features: true },
        order: { features: { order: 'ASC' } },
      }),
    ]);

    const result = steps.map((step) => {
      let data: any[] = [];
      if (step.type === Steps.PRODUCT) {
        const ids = step.categoryIds?.map(Number) || [];

        const filtered = products.filter((p) => ids.includes(p.category.id));
        data = plainToInstance(ProductResponseDto, filtered, {
          excludeExtraneousValues: true,
        });
      }
      if (step.type === Steps.PLAN) {
        data = packages.map((p) =>
          plainToInstance(PackageResponseDto, p, {
            excludeExtraneousValues: true,
          }),
        );
      }

      return {
        ...step,
        data,
      };
    });

    return plainToInstance(HomeStepResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
