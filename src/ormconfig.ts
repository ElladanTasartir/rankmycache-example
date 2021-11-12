import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { mysql } from './config';

const { host, username, password, database, port, logging, synchronize } =
  mysql;

export const ormConfig = {
  type: 'mysql',
  autoLoadEntities: true,
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
  charset: 'utf8mb4',
} as TypeOrmModuleOptions;
