import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { SignInUnauthorizedException } from '../../common/exceptions/sign-in-unauthorized.exception';

/**
 * JWT 인증이 필요한 핸들러에 사용되는 Guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err !== null || !user) throw new SignInUnauthorizedException();

    return user;
  }
}
