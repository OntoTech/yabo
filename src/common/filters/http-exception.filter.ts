import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<NestifyResponse>();
    const statusCode = exception.getStatus();
    const message = exception.getResponse();

    response.status(statusCode).json({ statusCode, message });
  }
}
