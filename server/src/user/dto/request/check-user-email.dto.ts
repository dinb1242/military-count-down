import { ApiProperty } from '@nestjs/swagger';

export class CheckUserEmailDto {
  @ApiProperty({ description: '이메일' })
  readonly email: string;
}
