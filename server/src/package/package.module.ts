import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Package } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Package])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
