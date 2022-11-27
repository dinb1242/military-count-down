import { BadRequestException, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { multerOptions } from '../common/lib/multer.option';
import { BbsType } from '../common/enums/bbs-type.enum';
import { Prisma } from '@prisma/client';
import { FileResponseDto } from './dto/response/file-response.dto';

@ApiTags('파일 API')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('upload/:bbsType/:bbsId')
  @ApiOperation({
    summary: '파일 단일 업로드 API',
    description: 'Multipart/form-data 로 데이터를 전달받아 파일을 업로드한다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'bbsType',
    required: true,
    enum: BbsType,
  })
  @UseInterceptors(FileInterceptor('file', multerOptions)) // Multer Option 을 활용한 서버 프로젝트 내 파일 업로드
  async uploadFile(
    @Param('bbsType') bbsType: BbsType,
    @Param('bbsId') bbsId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileResponseDto> {
    const { filename, path, size, mimetype } = file;

    const fileCreateInput: Prisma.FileCreateInput = {
      filename: filename,
      filePath: path,
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
      default:
        throw new BadRequestException('일치하는 bbsType 을 찾을 수 없습니다. bbsType=' + bbsType);
    }

    return this.fileService.uploadFile(fileCreateInput);
  }
}
