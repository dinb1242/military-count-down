import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExampleDto {
  @ApiProperty({ description: '제목', example: '테스트 제목' })
  readonly title: string;
  @ApiPropertyOptional({ description: '내용', example: '테스트 내용' })
  readonly content?: string;
}
