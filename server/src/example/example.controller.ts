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
  async create(@Body() createExampleDto: CreateExampleDto) {
    return await this.exampleService.create(createExampleDto);
  }

  @Get()
  findAll() {
    return this.exampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    return this.exampleService.update(+id, updateExampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleService.remove(+id);
  }
}
