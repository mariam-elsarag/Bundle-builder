import { Steps } from 'src/common/utils/enum';
import { Package } from 'src/package/entities/package.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HomeStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  subTitle: string;

  @Column()
  order: number;

  @Column({ type: 'enum', enum: Steps })
  type: Steps;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Product, (product) => product.step)
  products: Product[];

  @OneToMany(() => Package, (pkg) => pkg.step)
  packages: Package[];

  @Column('simple-array', { nullable: true })
  categoryIds: number[];

  @Column('simple-array', { nullable: true })
  packageIds?: number[];
}
