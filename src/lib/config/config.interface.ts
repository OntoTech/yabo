import { ConfigType } from '@nestjs/config';
import { app, database } from './configs';

export interface Config {
  app: ConfigType<typeof app>;
  database: ConfigType<typeof database>;
}
