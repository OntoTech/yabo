import { HelperUtils } from '@common/helpers/helpers.utils';
import { Module, RequestMethod } from '@nestjs/common';
import { LoggerModule, Params } from 'nestjs-pino';

const redactFields = [
  'req.headers.authorization',
  'req.body.password',
  'req.body.confirmPassword',
];
const basePinoOptions = {
  translateTime: true,
  ignore: 'pid,hostname',
  singleLine: true,
  redact: redactFields,
};

export const pinoConfig = (): Params => {
  return {
    pinoHttp: {
      level: process.env.APP_LOG_LEVEL || 'info',
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
      timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
      // TODO: refactor this
      // start
      customProps: (_requser, _response) => ({
        context: 'HTTP',
      }),
      serializers: {
        req(request: {
          body: Record<string, any>;
          raw: {
            body: Record<string, any>;
          };
        }) {
          request.body = request.raw.body;

          return request;
        },
      },
      redact: {
        paths: redactFields,
        censor: '**SENSITIVE INFO**',
      },
      // end
      transport: HelperUtils.isProd()
        ? undefined
        : {
            target: 'pino-pretty',
            options: { ...basePinoOptions, colorize: true },
          },
    },
    exclude: [{ method: RequestMethod.ALL, path: '/doc/*' }],
  };
};

@Module({
  imports: [
    LoggerModule.forRoot({
      ...pinoConfig(),
      exclude: [{ method: RequestMethod.ALL, path: 'doc' }],
    }),
  ],
  exports: [LoggerModule],
})
export class NestPinoModule {}
