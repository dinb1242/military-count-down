import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CipherUtils } from '../common/utils/cipher.util';
import { UserService } from '../user/user.service';
import { SignInUnauthorizedException } from '../common/exceptions/sign-in-unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthToken, Prisma } from '@prisma/client';
import { SignInResponseDto } from './dto/response/sign-in-response.dto';
import { convert, Instant, LocalDateTime, ZoneId } from 'js-joda';
import { JwtUtils } from '../common/utils/jwt.util';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtUtils: JwtUtils,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Passport 에서 Local Strategy 를 위한 헬퍼 함수.
   * userService 를 통해 파라미터로 전달받은 이메일을 지닌 사용자를 탐색한다.
   * 유저 정보가 없을 경우, 예외를 반환한다.
   * @param email 이메일
   * @param password 비밀번호
   * @return 비밀번호를 제외한 유저에 대한 정보
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.loadUserByEmail({ email: email });

    // 유저 정보가 없을 경우, 예외를 반환한다.
    if (!user) {
      throw new SignInUnauthorizedException();
    }

    if (await CipherUtils.hashMatches(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      throw new SignInUnauthorizedException();
    }
  }

  /**
   * 로그인을 수행한다.
   * JWT(Access Token, Refresh Token) 를 생성하고, 이를 DB 에 기록한다.
   * 최종적으로 생성한 JWT 토큰들을 반환한다.
   * @param user JWT Strategy 로부터 반환된 Request 객체 내 유저 정보
   * @param currentIp 접근 유저 아이피
   * @param userAgent 접근 유저 에이전트
   * @return Access Token 및 갱신을 위한 Refresh Token
   */
  async signIn(user: any, currentIp: string, userAgent: string): Promise<SignInResponseDto> {
    const payload = {
      email: user.email,
      sub: user.id,
      isAdmin: user.isAdmin
    };

    // 토큰을 생성한다.
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    // 토큰의 만료 일시를 추출한 후, 토큰 관리를 위해 데이터베이스에 저장한다.
    const decAccessToken: any = this.jwtService.decode(accessToken);
    const decRefreshToken: any = this.jwtService.decode(refreshToken);
    const accessTokenExpiresAt = LocalDateTime.ofInstant(
      Instant.ofEpochMilli(decAccessToken.exp * 1000),
      ZoneId.of('UTC+9'),
    );
    const refreshTokenExpiresAt = LocalDateTime.ofInstant(
      Instant.ofEpochMilli(decRefreshToken.exp * 1000),
      ZoneId.of('UTC+9'),
    );

    const authTokenCreateInput: Prisma.AuthTokenCreateInput = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        connect: { id: user.id },
      },
      aTExpiredAt: convert(accessTokenExpiresAt).toDate(),
      rTExpiredAt: convert(refreshTokenExpiresAt).toDate(),
    };

    const createAuthToken = this.prismaService.authToken.create({
      data: authTokenCreateInput,
    });

    // 로그인 히스토리에 로그인 정보를 저장한다.
    const accessHistory: Prisma.AccessHistoryCreateInput = {
      user: {
        connect: { id: user.id },
      },
      ip: currentIp,
      device: userAgent,
    };
    const createAccessHistory = this.prismaService.accessHistory.create({
      data: accessHistory,
    });

    await this.prismaService.$transaction([createAuthToken, createAccessHistory]);

    return new SignInResponseDto(accessToken, refreshToken);
  }

  /**
   * 로그아웃을 수행한다.
   * 로그아웃 시, 데이터베이스 내에 존재하는 해당 사용자에 대한 모든 토큰을 제거한다.
   * @param request
   */
  async signOut(request: Request): Promise<boolean> {
    const user: any = request.user;
    const { id } = user;

    // 데이터베이스 내에서 사용자의 모든 토큰을 제거한다.
    await this.prismaService.authToken
      .deleteMany({
        where: { userId: id },
      })
      .then((res) => {
        console.log(res);
      });
    Logger.log(`사용자 토큰이 데이터베이스에서 제거되었습니다. userId=${id}`);

    return true;
  }

  /**
   * Access Token 을 재발급한다.
   * 만일, Refresh Token 이 만료되었을 경우, Refresh Token 을 함께 재발급하여 반환한다.
   * @param _accessToken Access Token
   * @param _refreshToken Refresh Token
   * @return 갱신된 Access Token 및 Refresh Token(선택)
   */
  async tokenReissue(
    _accessToken: string,
    _refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let accessToken = _accessToken;
    let refreshToken = _refreshToken;

    // 전달받은 Access Token 과 Refresh Token 쌍을 데이터베이스 내의 데이터와 비교한다.
    // 만일 존재하지 않을 경우, 만료된 토큰 혹은 유효하지 않은 토큰으로 간주하고 예외를 발생시킨다.
    const authTokenResult: AuthToken[] = await this.prismaService.authToken.findMany({
      where: { accessToken: accessToken, refreshToken: refreshToken },
    });

    if (authTokenResult.length === 0)
      throw new UnauthorizedException(
        '데이터베이스 내 Access Token 과 Refresh Token 에 일치하는 데이터가 없습니다. 유효하지 않거나 조작된 토큰일 수 있습니다.',
      );

    // Access Token 내의 유저 payload 를 추출하여 재생성한다.
    const decodedUser: any = this.jwtService.decode(accessToken);
    const payload: any = {
      email: decodedUser.email,
      sub: decodedUser.sub,
    };

    // Refresh Token 를 체크하여 만료 시, Access Token 과 Refresh Token 을 재발급한다.
    if (this.jwtUtils.checkExpired(refreshToken)) {
      Logger.log('Refresh Token 이 만료되었습니다. Refresh Token 과 Access Token 을 재발급합니다.');
      accessToken = this.jwtService.sign(payload);
      refreshToken = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });
    } else {
      Logger.log('Refresh Token 이 만료되지 않았습니다. Access Token 을 재발급합니다.');
      accessToken = this.jwtService.sign(payload);
    }

    // 갱신된 토큰을 업데이트한다.
    await this.prismaService.authToken.update({
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      where: { accessToken: _accessToken },
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
