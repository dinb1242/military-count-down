import { ApiProperty } from '@nestjs/swagger';
import { CoworkerWikiResponseDto } from './coworker-wiki-response.dto';
import { UserResponseDto } from '../../../user/dto/response/user-response.dto';
import { TimeUtils } from '../../../common/utils/time.util';

export class CoworkerWikiRevisionResponseDto {
  constructor(coworkerWikiRevision: any) {
    this.id = coworkerWikiRevision.id;
    this.authorId = coworkerWikiRevision.authorId;
    this.coworkerWikiId = coworkerWikiRevision.coworkerWikiId;
    this.wikiContent = coworkerWikiRevision.wikiContent;
    this.coworkerWiki = new CoworkerWikiResponseDto(coworkerWikiRevision.coworkerWiki);
    this.author = new UserResponseDto(coworkerWikiRevision.author);
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(coworkerWikiRevision.createdAt);
    // this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(coworkerWikiRevision.updatedAt);
  }

  @ApiProperty({ description: '리비전 시퀀스' })
  id: number;

  @ApiProperty({ description: '작성자 시퀀스' })
  authorId: number;

  @ApiProperty({ description: '위키 시퀀스' })
  coworkerWikiId: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '부모 위키 DTO' })
  coworkerWiki: CoworkerWikiResponseDto;

  @ApiProperty({ description: '작성자 정보 DTO' })
  author: UserResponseDto;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
