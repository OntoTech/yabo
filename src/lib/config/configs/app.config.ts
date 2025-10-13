import { APP_ENVIRONMENTS, APP_LOGLEVELS } from '@common/constant';
import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appConfigValidationSchema = {
  NODE_ENV: Joi.string()
    .valid(...APP_ENVIRONMENTS)
    .required(),
  APP_PORT: Joi.number().port().required(),
  APP_PREFIX: Joi.string().required(),
  APP_LOG_LEVEL: Joi.string()
    .valid(...APP_LOGLEVELS)
    .required(),
  APP_NAME: Joi.string().required(),
  APP_USER_HEADER: Joi.string().required(),
  APP_ADMIN_LIST: Joi.string().required(),
  APP_MANAGER_LIST: Joi.string().required(),
};

export const app = registerAs('app', () => ({
  port: process.env.APP_PORT,
  prefix: process.env.APP_PREFIX,
  env: process.env.NODE_ENV,
  logLevel: process.env.APP_LOG_LEVEL,
  name: process.env.APP_NAME,
  userHeader: process.env.APP_USER_HEADER,
  adminList: process.env.APP_ADMIN_LIST,
  managerList: process.env.APP_MANAGER_LIST,
}));
