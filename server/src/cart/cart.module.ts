import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStep } from 'src/home/entities/step.entities';
import { Package } from 'src/package/entities/package.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      CartItem,

      Package,
      Product,
      Variant,
      HomeStep,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
