import process from 'node:process';
import { IS_PUBLIC_KEY_META } from '@common/constant';
import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_ENDPOINT,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
} from '@common/constant/string.constants';
import { swaggerOptions } from '@common/swagger/swagger.plugin';
import {
  INestApplication,
  Logger,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isArray } from 'class-validator';
import { getMiddleware } from 'swagger-stats';
import path from 'node:path';
// import metadata from 'metadata';

const logger = new Logger('App:Utils');

export const AppUtils = {
  validationPipeOptions(): ValidationPipeOptions {
    return {
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      validateCustomDecorators: true,
      enableDebugMessages: true, //HelperUtils.isDev(),
    };
  },

  async gracefulShutdown(app: INestApplication, code: string) {
    setTimeout(() => process.exit(1), 5000);

    logger.verbose(`Signal ${code} received.`);
    logger.log('Gracefully shutting down the http server.`');

    try {
      await app.close();
      logger.log('Http server closed.');
      process.exit(0);
    } catch (error: any) {
      logger.error('Error shutting down the http server:', error);
      process.exit(1);
    }
  },
  killAppGracefully(app: INestApplication) {
    process.on('SIGINT', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGINT');
    });

    process.on('SIGTERM', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGTERM');
    });
  },
  async setupSwagger(
    app: INestApplication,
    configService: ConfigService<Configs, true>,
  ) {
    const appName = configService.get('app', { inferType: true }).name;

    const options = new DocumentBuilder()
      .setTitle(SWAGGER_TITLE)
      .addBearerAuth()
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(SWAGGER_API_CURRENT_VERSION)
      .addServer(
        `${path.join(configService.get('app').swaggerPrefix, configService.get('app').prefix)}`,
        'main',
      )
      .addTag('Application')
      .addTag('Application-type')
      .addTag('Attribute')
      .addTag('Attribute-type')
      .addTag('Auth')
      .addTag('Role')
      .addTag('Schema')
      .addTag('User')
      .build();

    // await SwaggerModule.loadPluginMetadata(metadata);
    const document = SwaggerModule.createDocument(app, options, {});

    const paths = Object.values(document.paths);

    for (const path of paths) {
      const methods = Object.values(path) as { security: string[] }[];

      for (const method of methods) {
        if (
          isArray(method.security) &&
          method.security.includes(IS_PUBLIC_KEY_META)
        ) {
          method.security = [];
        }
      }
    }

    app.use(
      getMiddleware({
        swaggerSpec: document,
        authentication: false,
        hostname: appName,
        uriPath: '/stats',
      }),
    );

    SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document, {
      explorer: true,
      swaggerOptions,
    });
  },
};
