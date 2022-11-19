import { ApiProperty } from '@nestjs/swagger';

/**
 * 로그인을 위해 이메일과 패스워드를 비즈니스 레이어에 전달하기 위한 Request DTO
 */
export class SignInRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'example@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: '패스워드',
    example: '1234!5678MM!@',
  })
  readonly password: string;
}
