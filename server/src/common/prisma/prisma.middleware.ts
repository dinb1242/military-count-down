import { Prisma } from '@prisma/client';
import * as _ from 'lodash';

export async function DateMiddleware<T = any>(
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<T>,
) {
  const result = await next(params);
  return_date(result);
  return result;
}

function return_date(obj: any): void {
  _.forEach(obj, (value) => {
    if (value instanceof Date) {
      const thisHour = value.getHours();
      value.setHours(thisHour + 9);
      return;
    }
    if (typeof value === 'object') return return_date(value);
    return;
  });
  return;
}
