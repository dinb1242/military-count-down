import { ApiProperty } from '@nestjs/swagger';

export class CreateRetrospectDto {
  @ApiProperty({ description: '제목' })
  readonly title: string;

  @ApiProperty({ description: '내용' })
  readonly content?: string;
}
