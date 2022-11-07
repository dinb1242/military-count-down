import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/request/create-example.dto';
import { UpdateExampleDto } from './dto/request/update-example.dto';
import { DATA_SOURCE } from '../commons/constants/repository.constants';
import { DataSource } from 'typeorm';
import { Example } from './entities/example.entity';
import { ExampleResponseDto } from './dto/response/example-response.dto';

@Injectable()
export class ExampleService {
  constructor(
    @Inject(DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const example: Example = await queryRunner.manager.save(createExampleDto.toEntity());
      throw new HttpException('하이', 999);
      await queryRunner.commitTransaction();

      return new ExampleResponseDto(example);
    } catch (err) {
      await queryRunner.rollbackTransaction();

      // 예외 catch 시, intanceof 를 통한 타입 명시적 변환하여 예외 반환
      if (err instanceof HttpException) throw new HttpException(err.message, err.getStatus());
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all example`;
  }

  findOne(id: number) {
    return `This action returns a #${ id } example`;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    console.log(updateExampleDto);
    return `This action updates a #${ id } example`;
  }

  remove(id: number) {
    return `This action removes a #${ id } example`;
  }
}
