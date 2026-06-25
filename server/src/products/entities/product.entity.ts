import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Variant } from './variant.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  discountRate: number;

  @Column({ type: 'int', nullable: true })
  quantity: number | null;

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: true,
    eager: true,
  })
  variants: Variant[];

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    eager: true,
  })
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
