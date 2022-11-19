import { ApiProperty } from '@nestjs/swagger';

/**
 * 로그인 성공 이후 Access Token 과 Refresh Token 을 반환하기 위한 Response DTO
 */
export class SignInResponseDto {
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @ApiProperty({ description: 'Access Token', example: 'JWT Access Token' })
  readonly accessToken: string;

  @ApiProperty({ description: 'Refresh Token', example: 'JWT Refresh Token' })
  readonly refreshToken: string;
}
