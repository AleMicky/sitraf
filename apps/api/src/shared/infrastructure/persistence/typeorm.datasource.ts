import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

const rootDir = path.resolve(__dirname, '../../../../../..');
dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local'), override: true });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'transcore',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/shared/infrastructure/persistence/migrations/*.{ts,js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});

