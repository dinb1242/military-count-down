import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {WikiType} from "../../../common/enums/wiki-type.enum";

export class CreateCoworkerWikiDto {
  @ApiProperty({ description: '위키 타입' })
  readonly wikiType: WikiType

  @ApiProperty({ description: '위키 마크다운 내용' })
  @IsString()
  readonly wikiContent: string;
}
