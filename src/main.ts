import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import { AppModule } from './modules/app.module';
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { HelperUtils } from '@common/helpers/helpers.utils';
import { AppUtils } from '@common/helpers/app.utils';
import { InternalDisabledLogger } from '@lib/pino/internal.logger';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { logger: new InternalDisabledLogger() },
  );

  const configService = app.get(ConfigService<Configs, true>);

  if (!HelperUtils.isProd()) {
    await AppUtils.setupSwagger(app, configService);
  }

  app.use(bodyParser.json({ limit: '50mb' }));

  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const appVersion = process.env.npm_package_version ?? '0.0.0';

  const globalPrefix = configService.get('app').prefix || 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableShutdownHooks();
  AppUtils.killAppGracefully(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = configService.get('app').port || 3000;
  const env = configService.get('app').env || 'dev';
  const logLevel = configService.get('app').logLevel || 'info';

  await app.listen(port, '0.0.0.0');
  logger.log(
    `Application version [${appVersion}] is running on port [${port}] in [${env}] mode with log level [${logLevel}]`,
  );
}

try {
  (async () => bootstrap())();
} catch (error) {
  logger.error(error);
}
