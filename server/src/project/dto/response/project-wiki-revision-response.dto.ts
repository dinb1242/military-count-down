import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../../user/dto/response/user-response.dto';
import { TimeUtils } from '../../../common/utils/time.util';
import { ProjectWikiResponseDto } from './project-wiki-response.dto';

export class ProjectWikiRevisionResponseDto {
  constructor(projectWikiRevision: any) {
    this.id = projectWikiRevision.id;
    this.authorId = projectWikiRevision.authorId;
    this.projectWikiId = projectWikiRevision.projectWikiId;
    this.wikiContent = projectWikiRevision.wikiContent;
    this.projectWiki = new ProjectWikiResponseDto(projectWikiRevision.projectWiki);
    this.author = new UserResponseDto(projectWikiRevision.author);
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(projectWikiRevision.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(projectWikiRevision.updatedAt);
  }

  @ApiProperty({ description: '리비전 시퀀스' })
  id: number;

  @ApiProperty({ description: '작성자 시퀀스' })
  authorId: number;

  @ApiProperty({ description: '위키 시퀀스' })
  projectWikiId: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '부모 위키 DTO' })
  projectWiki: ProjectWikiResponseDto;

  @ApiProperty({ description: '작성자 정보 DTO' })
  author: UserResponseDto;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
