import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: '제목', required: true })
  readonly title: string;

@ApiProperty({ description: '내용' })
  readonly content: string;
}
