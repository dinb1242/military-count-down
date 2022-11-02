import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.path;
    const statusCode = exception.getStatus();
    const message = exception.message;

    response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      path: path,
      message: message,
      data: null,
    });
  }
}
