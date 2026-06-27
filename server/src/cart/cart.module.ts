import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Package } from 'src/package/entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Category, Package])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
