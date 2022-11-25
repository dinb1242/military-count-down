import { ApiProperty } from '@nestjs/swagger';
import { CoworkerWiki } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class CoworkerWikiResponseDto {
  constructor(coworkerWiki: CoworkerWiki) {
    this.id = coworkerWiki.id;
    this.coworkerId = coworkerWiki.coworkerId;
    this.wikiContent = coworkerWiki.wikiContent;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(coworkerWiki.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(coworkerWiki.updatedAt);
  }

  @ApiProperty({ description: '시퀀스', example: '1' })
  id: number;

  @ApiProperty({ description: 'coworker 시퀀스', example: '1' })
  coworkerId: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
