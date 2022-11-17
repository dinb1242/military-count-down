import { Injectable } from '@nestjs/common';
import { CipherUtils } from 'src/common/utils/cipher.util';
import { UserService } from 'src/user/user.service';
import { SignInUnauthorizedException } from '../common/exceptions/sign-in-unauthorized.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cipherUtils: CipherUtils,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.loadUserByEmail({ email: email });

    // 유저 정보가 없을 경우, 예외를 반환한다.
    if (user === null) {
      throw new SignInUnauthorizedException();
    }

    if (await this.cipherUtils.hashMatches(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }
}
