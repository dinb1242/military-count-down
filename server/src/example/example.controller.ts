import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/request/create-example.dto';
import { UpdateExampleDto } from './dto/request/update-example.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('예제 API')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  async createExample(@Body() data: { title: string; content?: string }) {
    return await this.exampleService.createExample(data);
  }

  @Patch(':id')
  async updateExample(
    @Param('id') id: number,
    @Body() data: {
      title: string;
      content?: string;
    },
  ) {
    return await this.exampleService.updateExample(id, data);
  }
}
