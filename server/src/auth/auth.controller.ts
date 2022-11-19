import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignInRequestDto } from './dto/request/sign-in-request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInResponseDto } from './dto/response/sign-in-response.dto';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async signIn(@Req() request: Request): Promise<SignInResponseDto> {
    return this.authService.signIn(request.user);
  }
}
