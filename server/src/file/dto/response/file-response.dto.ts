import { ApiProperty } from '@nestjs/swagger';
import { File as FileModel } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class FileResponseDto {
  constructor(file: FileModel) {
    if (file) {
      this.id = file.id;
      this.filename = file.filename;
      this.filePath = file.filePath;
      this.fileSize = file.fileSize;
      this.mimeType = file.mimeType;
      this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(file.createdAt);
      this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(file.updatedAt);
    }
  }

  @ApiProperty({ description: '파일 시퀀스' })
  readonly id: number;

  @ApiProperty({ description: '파일명' })
  readonly filename: string;

  @ApiProperty({ description: '파일 저장 경로' })
  readonly filePath: string;

  @ApiProperty({ description: '파일 사이즈' })
  readonly fileSize: number;

  @ApiProperty({ description: '파일 타입' })
  readonly mimeType: string;

  @ApiProperty({
    description: '생성일',
    example: '2022-01-01 00:00:00',
  })
  readonly createdAt: string;

  @ApiProperty({
    description: '수정일',
    example: '2022-01-01 00:00:00',
  })
  readonly updatedAt: string;
}
