import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

export interface CommonResponse<T> {
  success: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T;
}

/**
 * 모든 API 에 대하여 공통 Response 를 생성하여 반환하기 위한 Interceptor
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, CommonResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CommonResponse<T>> | Promise<Observable<CommonResponse<T>>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const path = request.path;
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: statusCode,
        path: path,
        message: '',
        data: data,
      })),
    );
  }
}
