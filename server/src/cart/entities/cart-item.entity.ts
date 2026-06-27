import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { Product } from 'src/products/entities/product.entity';
import { Steps } from 'src/common/utils/enum';
import { Package } from 'src/package/entities/package.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column({ type: 'enum', enum: Steps })
  type: Steps;

  @ManyToOne(() => Product, {
    nullable: true,
  })
  product?: Product;

  @ManyToOne(() => Variant, {
    nullable: true,
  })
  variant?: Variant;

  @ManyToOne(() => Package, { nullable: true })
  package?: Package;

  @Column({ default: 0 })
  quantity: number;
}
