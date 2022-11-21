import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
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
    const exceptionResponse: any = exception.getResponse();
    const path = request.path;
    const statusCode = exception.getStatus();
    const message = exceptionResponse.message;

    Logger.error(`path=${path} exception=${exception}`);

    // 커스텀 예외 발생 시에 대한 cause 조건문 처리
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
