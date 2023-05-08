import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_DB_HOST'),
  port: configService.get('POSTGRES_DB_PORT'),
  username: configService.get('POSTGRES_DB_USERNAME'),
  password: configService.get('POSTGRES_DB_PASSWORD'),
  database: configService.get('POSTGRES_DB_NAME'),
  synchronize: false,
  entities: [join(__dirname, '/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
});
