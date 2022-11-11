import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({ description: '실명', example: '홍길동' })
  readonly name?: string;
  @ApiProperty({ description: '이메일', example: 'example@example.com' })
  readonly email: string;
}
