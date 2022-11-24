import { ApiProperty } from '@nestjs/swagger';

export class CreateCoworkerWikiDto {
  @ApiProperty({ description: '위키 마크다운 내용' })
  readonly wikiContent;
}
