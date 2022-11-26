import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { multerOptions } from '../common/lib/multer.option';

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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename, path, size } = file;
    await this.fileService.uploadFile({
      filename: filename,
      filePath: path,
      fileSize: size,
    });
  }
}
