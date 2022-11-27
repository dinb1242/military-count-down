import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, File as FileModel } from '@prisma/client';
import { FileResponseDto } from './dto/response/file-response.dto';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 서버 단에 저장된 파일을 데이터베이스에 관련 정보를 저장한다.
   * @param fileCreateInput 파일 메타데이터에 대한 프리즈마 DTO
   * @return 저장된 파일에 대한 DTO
   */
  async uploadFile(fileCreateInput: Prisma.FileCreateInput): Promise<FileResponseDto> {
    const fileEntity: FileModel = await this.prismaService.file.create({ data: fileCreateInput });

    return new FileResponseDto(fileEntity);
  }
}
