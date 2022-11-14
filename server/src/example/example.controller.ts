import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Example as ExampleModel } from '@prisma/client';
import { CreateExampleDto } from './dto/request/create-example.dto';
import { UpdateExampleDto } from './dto/request/update-example.dto';
import { PageRequestDto } from 'src/common/dto/request/page-request.dto';

@ApiTags('예제 API')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  async createExample(@Body() data: CreateExampleDto) {
    return await this.exampleService.createExample(data);
  }

  @Patch(':id')
  async updateExample(@Param('id') id: number, @Body() data: UpdateExampleDto) {
    return await this.exampleService.updateExample({ id: Number(id) }, data);
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
    const { elementCnt, lastId } = page;
    return await this.exampleService.findExamples({
      take: Number(elementCnt),
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: Number(lastId) } }),
      ...(keyword && {
        where: {
          OR: [
            {
              title: { contains: keyword },
            },
            {
              content: { contains: keyword },
            },
          ],
        },
      }),
      orderBy: { createdAt: 'desc' }
    });
  }

  @Get(':id')
  async findExample(@Param('id') id: string): Promise<ExampleModel> {
    return await this.exampleService.findExample({ id: Number(id) });
  }
}
