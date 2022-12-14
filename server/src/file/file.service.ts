import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { File as FileModel, Prisma } from '@prisma/client';
import { FileResponseDto } from './dto/response/file-response.dto';
import { BbsType } from "./enums/bbs-type.enum";
import { R2Utils } from "../common/utils/r2.util";
import { randomUUID } from "crypto";

@Injectable()
export class FileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly r2Utils: R2Utils
  ) {}

  /**
   * R2에 저장된 파일의 관련 정보를 데이터베이스에 저장한다.
   * @param user JWT 유저 정보
   * @param bbsType 저장할 파일에 대한 bbsType
   * @param bbsId 저장할 파일에 대한 bbs 시퀀스
   * @param file 저장할 파일
   * @return 저장된 파일에 대한 DTO
   */
  async uploadFile(user: any, bbsType: BbsType, bbsId: number, file: Express.Multer.File): Promise<FileResponseDto> {
    try {
      // R2 에 파일을 업로드한다.
      const key = `${bbsType}/${randomUUID() + "_" + file.originalname}`
      await this.r2Utils.uploadObject(key, file.buffer);
      Logger.log(`업로드가 완료되었습니다.\nObject path=${key}`);

      const objectPath = `${process.env.R2_PUBLIC_ENDPOINT}/${key}`;

      const { originalname, size, mimetype } = file;

      const fileCreateInput: Prisma.FileCreateInput = {
        filename: originalname,
        filePath: objectPath,
        fileKey: key,
        fileSize: size,
        mimeType: mimetype,
      };

      // bbsType 을 체크한다.
      switch (bbsType) {
        case BbsType.COWORKER:
          fileCreateInput.coworker = {
            connect: { id: bbsId },
          };
          break;
        case BbsType.PROJECT:
          fileCreateInput.project = {
            connect: { id: bbsId },
          };
          break;
        default:
          throw new BadRequestException('일치하는 bbsType 을 찾을 수 없습니다. bbsType=' + bbsType);
      }

      const fileEntity: FileModel = await this.prismaService.file.create({ data: fileCreateInput });

      return new FileResponseDto(fileEntity);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('R2 파일 업로드 중 오류가 발생했습니다. 로그를 확인해주세요.');
    }
  }

  async markdownFileUpload(user: any, file: Express.Multer.File): Promise<string> {
    // R2 에 파일을 업로드한다.
    const { email } = user;
    const key = `${email}/Markdown/${randomUUID() + "_" + file.originalname}`
    await this.r2Utils.uploadObject(key, file.buffer);
    Logger.log(`업로드가 완료되었습니다.\nObject path=${key}`);

    return `${process.env.R2_PUBLIC_ENDPOINT}/${key}`;
  }
}
