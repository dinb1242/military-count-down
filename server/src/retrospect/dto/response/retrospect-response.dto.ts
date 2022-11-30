import { Retrospect as RetrospectModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TimeUtils } from '../../../common/utils/time.util';

export class RetrospectResponseDto {
  constructor(restropect: RetrospectModel) {
    this.id = restropect.id;
    this.title = restropect.title;
    this.content = restropect.content;
    this.authorId = restropect.authorId;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(restropect.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(restropect.updatedAt);
  }

  @ApiProperty({ description: '회고 시퀀스' })
  readonly id: number;

  @ApiProperty({ description: '회고 제목' })
  readonly title: string;

  @ApiProperty({ description: '회고 내용' })
  readonly content: string;

  @ApiProperty({ description: '작성자 시퀀스' })
  readonly authorId: number;

  @ApiProperty({ description: '생성일' })
  readonly createdAt: string;

  @ApiProperty({ description: '수정일' })
  readonly updatedAt: string;
}
