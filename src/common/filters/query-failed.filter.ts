import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class QueryFailedFilter implements ExceptionFilter {
  // TODO: think about any
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<NestifyResponse>();
    // TODO: rework this
    const status = exception.status
      ? exception.status
      : exception.name && exception.name.startsWith('UQ')
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      error: exception.detail,
      message: exception.message,
      hint: exception.hint || exception?.response?.message,
    });
  }
}
