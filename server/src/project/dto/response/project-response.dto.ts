import { ApiProperty } from '@nestjs/swagger';
import { Project as ProjectModel } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class ProjectResponseDto {
  constructor(project: ProjectModel) {
    this.id = project.id;
    this.title = project.title;
    this.content = project.content;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(project.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(project.updatedAt);
  }

  @ApiProperty({ description: '프로젝트 시퀀스' })
  readonly id: number;

  @ApiProperty({ description: '제목' })
  readonly title: string;

  @ApiProperty({ description: '내용' })
  readonly content: string;

  @ApiProperty({ description: '생성일' })
  readonly createdAt: string;

  @ApiProperty({ description: '수정일' })
  readonly updatedAt: string;
}