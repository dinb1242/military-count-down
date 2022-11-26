import { ApiProperty } from '@nestjs/swagger';

export class FileResponseDto {
  @ApiProperty({ description: '파일명' })
  readonly filename: string;

  @ApiProperty({ description: '파일 저장 경로' })
  readonly filePath: string;
}
