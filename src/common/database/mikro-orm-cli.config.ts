import { defineConfig, Options } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { baseOptions } from './orm.config';
import { config as environmentConfig } from 'dotenv';
import dotEnvExpand from 'dotenv-expand';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const logger = new Logger('MikroORM');

const currentEnv = `${process.cwd()}/env/.env.${process.env.NODE_ENV}`;

const environment = environmentConfig({
  path: `${currentEnv}`,
});

dotEnvExpand.expand(environment);

logger.log(`Using env ${currentEnv} environment`);

const config: Options = defineConfig({
  ...baseOptions,
  dbName: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  extensions: [Migrator, SeedManager],
});

export default config;
