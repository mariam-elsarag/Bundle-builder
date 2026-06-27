import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/package/entities/package.entity';
import { Product } from 'src/products/entities/product.entity';
import { HomeStep } from './entities/step.entities';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package, HomeStep, Product])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
