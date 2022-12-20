import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/auth-public.decorator';
import { PrismaService } from "../../common/prisma/prisma.service";

/**
 * JWT 인증이 필요한 핸들러에 사용되는 Guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private readonly prismaService: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const isValidJwt: any = await super.canActivate(context);

    if (isValidJwt) {
      // JWT 토큰을 데이터베이스와 비교한다.
      const request: Request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      const isExistsToken = await this.prismaService.authToken.findUnique({
        where: { accessToken: authorization.replace('Bearer ', '') }
      })

      if (!isExistsToken) {
        return false;
      }
    }
    return isValidJwt;
  }
}
