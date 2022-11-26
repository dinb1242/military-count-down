import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client'

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 서버 단에 저장된 파일을 데이터베이스에 관련 정보를 저장한다.
   * @param file
   * @return 저장된 파일에 대한 DTO
   */
  async uploadFile(fileCreateInput: Prisma.FileCreateInput) {
    await this.prismaService.file.create({
      data: {

      }
    })
  }
}
