import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/request/create-example.dto';
import { UpdateExampleDto } from './dto/request/update-example.dto';

@Injectable()
export class ExampleService {
  async create(createExampleDto: CreateExampleDto) {
    console.log(createExampleDto);
    return 'Hello, World!';
  }

  findAll() {
    return `This action returns all example`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    console.log(updateExampleDto);
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
