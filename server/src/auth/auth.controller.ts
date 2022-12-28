import { Controller, Get, Headers, HttpCode, HttpStatus, Ip, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody, ApiForbiddenResponse,
  ApiHeaders, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInRequestDto } from './dto/request/sign-in-request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInResponseDto } from './dto/response/sign-in-response.dto';
import { Public } from './decorators/auth-public.decorator';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { RequiredAdmin } from "./decorators/auth-role.decorator";

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiBody({
    type: SignInRequestDto,
  })
  @ApiOperation({
    summary: '로그인 API',
    description:
      '이메일과 비밀번호를 전달받아 로그인을 수행한다.<br/>' +
      '성공적으로 로그인이 수행되면 Access Token 과 Refresh Token 이 발급된다.<br/>' +
      '이때, 해당 토큰은 데이터베이스 내에서 관리된다.',
  })
  @ApiOkResponse({
    description: '로그인 성공',
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({ description: '로그인 실패 - 아이디 혹은 패스워드 불일치' })
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() request: Request, @Ip() currentIp: string): Promise<SignInResponseDto> {
    const userAgent = request.headers['user-agent'];
    return this.authService.signIn(request.user, currentIp, userAgent);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('sign-out')
  @ApiOperation({
    summary: '로그아웃 API',
    description: '로그아웃을 수행한다. 로그아웃 즉시 데이터베이스 내에 해당하는 모든 Access Token 을 제거한다.',
  })
  @ApiOkResponse({
    description: '로그아웃 성공',
    type: Boolean,
  })
  @ApiUnauthorizedResponse({
    description: '로그아웃 실패 - 인증 실패',
  })
  async signOut(@Req() request: Request): Promise<boolean> {
    return await this.authService.signOut(request);
  }

  @Public()
  @Post('token-reissue')
  @ApiOperation({
    summary: 'Access Token 재발급 API',
    description:
      'Access Token 만료 이후, Refresh Token 과 Access Token 를 헤더로 전달받아 Access Token 갱신을 수행한다.<br/>' +
      '이때, Refresh Token 이 만료되었을 경우 aT 와 rT 를 갱신하여 헤더로 반환한다.<br/>' +
      'Refresh Token 이 유효할 경우, Access Token 만 헤더로 반환한다.<br/>' +
      '데이터베이스 내에 존재하는 aT 와 rT 가 일치하지 않을 경우, 예외를 반환한다.',
  })
  @ApiHeaders([
    {
      name: 'Access-Token',
      description: '갱신되어야 하는 Access Token',
    },
    {
      name: 'Refresh-Token',
      description: '유저가 지니고 있는 Refresh Token',
    },
  ])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '재발급 성공' })
  @ApiUnauthorizedResponse({ description: '재발급 실패 - DB 내 토큰 불일치' })
  async tokenReissue(
    @Res() response: Response,
    @Headers('Access-Token') accessToken: string,
    @Headers('Refresh-Token') refreshToken: string,
  ) {
    const result: any = await this.authService.tokenReissue(accessToken, refreshToken);
    return response
      .status(HttpStatus.OK)
      .setHeader('Access-Token', result.accessToken)
      .setHeader('Refresh-Token', result.refreshToken)
      .send();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('check')
  @ApiOperation({
    summary: 'Access Token 체크 API',
    description: 'Access Token 의 유효성을 검증한다.',
  })
  @ApiOkResponse({ description: '유효', type: Boolean })
  @ApiUnauthorizedResponse({ description: '미유효' })
  async checkAccessToken(): Promise<boolean> {
    return true;
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('/admin/check')
  @ApiOperation({
    summary: '[관리자] 관리자 권한 확인 API',
    description: 'JWT 토큰을 전달받아 관리자인지에 대한 상태를 체크한다. 만일 관리자일 경우, true 를 반환하고 아닐 경우 403 예외를 반환한다.'
  })
  @ApiOkResponse({
    type: Boolean,
    description: '확인 성공'
  })
  @ApiForbiddenResponse({
    description: '확인 실패 - 관리자 아님'
  })
  @ApiNotFoundResponse({
    description: '확인 실패 - 유저 미존재'
  })
  @RequiredAdmin()
  async checkAdmin(@Req() request: Request): Promise<Boolean> {
    const { id: userId }: any = request.user;
    return this.authService.checkAdmin(userId);
  }
}
