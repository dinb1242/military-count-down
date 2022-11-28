import { ApiProperty } from '@nestjs/swagger';
import { ProjectWiki as ProjectWikiModel } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class ProjectWikiResponseDto {
  constructor(projectWiki: ProjectWikiModel) {
    this.id = projectWiki.id;
    this.projectId = projectWiki.projectId;
    this.wikiContent = projectWiki.wikiContent;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(projectWiki.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(projectWiki.updatedAt);
  }

  @ApiProperty({ description: '시퀀스', example: '1' })
  id: number;

  @ApiProperty({ description: '프로젝트 시퀀스', example: '1' })
  projectId: number;

  @ApiProperty({ description: '위키 마크다운 내용' })
  wikiContent: string | null;

  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @ApiProperty({ description: '수정일' })
  updatedAt: string;
}
