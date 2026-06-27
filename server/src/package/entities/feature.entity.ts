import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Package } from './package.entity';

@Entity()
@Unique(['package', 'order'])
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Package, (pkg) => pkg.features, {
    onDelete: 'CASCADE',
  })
  package: Package;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
