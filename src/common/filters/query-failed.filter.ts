import { DriverException, ServerException } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(ServerException)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: DriverException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<NestifyResponse>();

    const status =
      exception.name && exception.name.startsWith('UQ')
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      // @ts-expect-error detail exists on mikro-orm exceptions
      error: exception.detail,
    });
  }
}
