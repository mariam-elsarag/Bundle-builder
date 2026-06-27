import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}
  async create(createPackageDto: CreatePackageDto) {
    const { features, ...packageData } = createPackageDto;

    const newPackage = await this.packageRepository.save(packageData);

    const packageFeatures = features.map((feature, index) =>
      this.featureRepository.create({
        text: feature.text,
        order: index + 1,
        package: newPackage,
      }),
    );

    await this.featureRepository.save(packageFeatures);

    return this.packageRepository.findOne({
      where: { id: newPackage.id },
      relations: {
        features: true,
      },
      order: {
        features: {
          order: 'ASC',
        },
      },
    });
  }
}
