import 'dotenv/config';
import { DataSource } from 'typeorm';
import { HomeStep } from '../home/entities/step.entities';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../products/entities/variant.entity';
import { Package } from '../package/entities/package.entity';
import { Feature } from '../package/entities/feature.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  entities: [HomeStep, Product, Variant, Package, Feature],

  synchronize: true,
  logging: false,
});
