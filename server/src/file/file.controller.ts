import { Controller, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { multerOptions } from './lib/multer.option';
import { BbsType } from './enums/bbs-type.enum';
import { FileResponseDto } from './dto/response/file-response.dto';
import { markdownMulterOptions } from './lib/markdown-multer.option';
import { Request } from "express";

@ApiTags('파일 API')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('upload/:bbsType/:bbsId')
  @ApiOperation({
    summary: '파일 단일 업로드 API',
    description: 'Multipart/form-data 로 데이터를 전달받아 파일을 R2에 업로드한다.',
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
    @Req() request: Request,
    @Param('bbsType') bbsType: BbsType,
    @Param('bbsId') bbsId: number,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<FileResponseDto> {
    const { user } = request;
    return this.fileService.uploadFile(user, bbsType, bbsId, file);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('/markdown/upload')
  @UseInterceptors(FileInterceptor('file', markdownMulterOptions))
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
  async markdownFileUpload(@Req() request: Request, @UploadedFile('file') file: Express.Multer.File) {
    const { user } = request;
    return this.fileService.markdownFileUpload(user, file);
  }
}
