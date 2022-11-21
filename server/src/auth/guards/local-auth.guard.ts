import { AuthGuard } from '@nestjs/passport';

/**
 * 이메일과 비밀번호를 통한 로그인에 필요한 Local Guard
 */
export class LocalAuthGuard extends AuthGuard('local') {}
