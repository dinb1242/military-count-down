import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이메일', example: 'example@example.com' })
  readonly email: string;

  @ApiProperty({ description: '패스워드', example: '1234asfdasdi!' })
  readonly password: string;

  @ApiProperty({ description: '실명', example: '홍길동' })
  readonly name: string;

  @ApiProperty({ description: '휴대번호', example: '01066793306' })
  readonly phone: string;
}
