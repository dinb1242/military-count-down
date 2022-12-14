import { ApiProperty } from '@nestjs/swagger';
import { DevPart } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';
import { FileResponseDto } from '../../../file/dto/response/file-response.dto';

export class CoworkerResponseDto {
  constructor(coworker: any) {
    this.id = coworker.id;
    this.name = coworker.name;
    this.devPart = coworker.devPart;
    this.projects = coworker.projects;
    this.profileImage = new FileResponseDto(coworker.file);
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(coworker.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(coworker.updatedAt);
  }

  @ApiProperty({ description: '시퀀스', example: '1' })
  readonly id: number;

  @ApiProperty({ description: '실명', example: '이세정' })
  readonly name: string;

  @ApiProperty({ description: '개발 파트', example: 'BACKEND' })
  readonly devPart: DevPart;

  @ApiProperty({ description: '프로젝트', example: "['a', 'b']" })
  readonly projects: string[];

  @ApiProperty({ description: '파일 DTO' })
  readonly profileImage: FileResponseDto;

  @ApiProperty({ description: '생성일', example: '2022-01-01 00:00:00' })
  readonly createdAt: string;

  @ApiProperty({ description: '수정일', example: '2022-01-01 00:00:00' })
  readonly updatedAt: string;
}
