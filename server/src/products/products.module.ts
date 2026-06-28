import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Variant } from './entities/variant.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HomeStep } from 'src/home/entities/step.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant, HomeStep])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
