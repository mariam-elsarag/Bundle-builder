import { AppDataSource } from './data-source';
import { seedDatabase } from './seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('🚀 Database connected');

    await seedDatabase(dataSource);

    console.log('🌱 Seeding finished');

    await dataSource.destroy();
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });
