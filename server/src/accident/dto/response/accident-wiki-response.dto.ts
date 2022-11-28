import { ApiProperty } from '@nestjs/swagger';
import { AccidentWiki as AccidentWikiModel } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class AccidentWikiResponseDto {
  constructor(accidentWiki: AccidentWikiModel) {
    this.id = accidentWiki.id;
    this.wikiContent = accidentWiki.wikiContent;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(accidentWiki.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(accidentWiki.updatedAt);
  }

  @ApiProperty({ description: '시퀀스', example: '1' })
  id: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
