import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../../user/dto/response/user-response.dto';
import { TimeUtils } from '../../../common/utils/time.util';
import { AccidentWikiResponseDto } from './accident-wiki-response.dto';

export class AccidentWikiRevisionResponseDto {
  constructor(accidentWikiRevision: any) {
    this.id = accidentWikiRevision.id;
    this.authorId = accidentWikiRevision.authorId;
    this.accidentWikiId = accidentWikiRevision.accidentWikiId;
    this.wikiContent = accidentWikiRevision.wikiContent;
    this.accidentWiki = new AccidentWikiResponseDto(accidentWikiRevision.accidentWiki);
    this.author = new UserResponseDto(accidentWikiRevision.author);
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(accidentWikiRevision.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(accidentWikiRevision.updatedAt);
  }

  @ApiProperty({ description: '리비전 시퀀스' })
  id: number;

  @ApiProperty({ description: '작성자 시퀀스' })
  authorId: number;

  @ApiProperty({ description: '위키 시퀀스' })
  accidentWikiId: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '부모 위키 DTO' })
  accidentWiki: AccidentWikiResponseDto;

  @ApiProperty({ description: '작성자 정보 DTO' })
  author: UserResponseDto;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
