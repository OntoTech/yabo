import { Module } from '@nestjs/common';
import {
  app,
  appConfigValidationSchema,
  database,
  databaseConfigValidationSchema,
} from './configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { HelperUtils } from '@common/helpers/helpers.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/env/.env.${process.env.NODE_ENV}`],
      load: [app, database],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...databaseConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
        cache: !HelperUtils.isProd(),
        debug: !HelperUtils.isProd(),
        stack: !HelperUtils.isProd(),
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
