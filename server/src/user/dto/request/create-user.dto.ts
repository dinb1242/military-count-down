import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '이메일', example: 'example@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: '패스워드', example: '1234asfdasdi!' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '실명', example: '홍길동' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '휴대번호', example: '01066793306' })
  @IsString()
  readonly phone: string;
}
