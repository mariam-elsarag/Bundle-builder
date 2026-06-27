import { Steps } from 'src/common/utils/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('simple-array', { nullable: true })
  categoryIds: number[];

  @Column('simple-array', { nullable: true })
  packageIds?: number[];
}
