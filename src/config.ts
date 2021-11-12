import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;

config({ path: envFile });

const REQUIRED_ENV_VARS = [
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USERNAME',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
];

REQUIRED_ENV_VARS.forEach((envVar) => {
  const val = process.env[envVar];
  if (!val) {
    throw new Error(`Required ENV VAR not set: ${envVar}`);
  }
});

export const mysql = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: !!process.env.SYNC_DB || false,
  logging: !!process.env.ORM_LOG_ENABLED || false,
};

export const cache = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  requestTimeout: Number(process.env.REDIS_TIMEOUT),
  keyPrefix: process.env.REDIS_PREFIX,
};
