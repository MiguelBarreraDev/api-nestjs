import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeormModuleOptions = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT, 10),
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  autoLoadEntities: true,
  synchronize: false,
  logging: 'all',
  logger: 'file',
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
});

export const databaseConfig = registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
