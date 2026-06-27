import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  name: string;

  @Column({ type: 'int', default: 0, unique: true })
  order: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string | null;

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
