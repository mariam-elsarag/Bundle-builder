import { BillingCycle, Currency } from 'src/common/utils/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Feature } from './feature.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  title: string;

  @Column({ type: 'varchar', length: 255 })
  subTitle: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string | null;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  discountRate: number;

  @Column({ type: 'enum', enum: BillingCycle, default: BillingCycle.MONTH })
  billingCycle: BillingCycle;

  @Column({ type: 'enum', enum: Currency, default: Currency.USD })
  currency: Currency;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @OneToMany(() => Feature, (feature) => feature.package, {
    cascade: true,
  })
  features: Feature[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
