import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HttpException Filter
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.path;
    const statusCode = exception.getStatus();
    const message = exception.message;

    if (exception.cause) {
      response.statusMessage = exception.cause.message;
    }

    response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      path: path,
      message: message,
      data: null,
    });
  }
}
