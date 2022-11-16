import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { SigninAuthDto } from './dto/request/signin-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiBody({
    type: SigninAuthDto,
  })
  async signIn(@Req() request: Request): Promise<any> {
    return this.authService.signIn(request.user);
  }
}
