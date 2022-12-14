import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Example as ExampleModel } from '@prisma/client';
import { CreateExampleDto } from './dto/request/create-example.dto';
import { UpdateExampleDto } from './dto/request/update-example.dto';
import { PageRequestDto } from 'src/common/dto/request/page-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { PrismaService } from '../common/prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators/auth-public.decorator';
import { R2Utils } from "../common/utils/r2.util";

@ApiBearerAuth(HttpHeaders.AUTHORIZATION)
@ApiTags('예제 API')
@Controller('example')
export class ExampleController {
  constructor(
    private readonly exampleService: ExampleService,
    private readonly prismaService: PrismaService,
    private readonly r2Utils: R2Utils
  ) {
  }

  @Post()
  async createExample(@Body() data: CreateExampleDto) {
    return await this.exampleService.createExample(data);
  }

  @Patch(':id')
  async updateExample(@Param('id') id: number, @Body() data: UpdateExampleDto) {
    return await this.exampleService.updateExample({id: Number(id)}, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt-test')
  async jwtTest(@Req() request: Request) {
    return request.user;
  }

  @Get('pagination')
  @ApiQuery({
    name: 'keyword',
    example: '제목 또는 내용',
    description: '제목 또는 내용',
    required: false,
  })
  async findExamplesWithPaging(
    @Query() page: PageRequestDto,
    @Query('keyword') keyword?: string,
  ): Promise<ExampleModel[]> {
    const {elementCnt, lastId} = page;
    return await this.exampleService.findExamples({
      take: Number(elementCnt),
      skip: lastId ? 1 : 0,
      ...(lastId && {cursor: {id: Number(lastId)}}),
      ...(keyword && {
        where: {
          OR: [
            {
              title: {contains: keyword},
            },
            {
              content: {contains: keyword},
            },
          ],
        },
      }),
      orderBy: {createdAt: 'desc'},
    });
  }

  @Get('test')
  async testMethod() {
    console.log(await this.prismaService.authToken.findMany());
  }

  @Get(':id')
  async findExample(@Param('id') id: string): Promise<ExampleModel> {
    return await this.exampleService.findExample({id: Number(id)});
  }

  @Public()
  @Post('r2/test')
  @ApiOperation({
    summary: 'R2 테스트 API',
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
  @UseInterceptors(FileInterceptor('file'))
  async r2Test(@UploadedFile('file') file: Express.Multer.File) {
    const result = await this.r2Utils.uploadObject(file.originalname, file.buffer);
    console.log(result);
    return null;
  }
}
