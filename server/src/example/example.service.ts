import { Inject, Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { DATA_SOURCE } from '../constants/repository.constants';
import { DataSource } from 'typeorm';

@Injectable()
export class ExampleService {
  constructor(
    // @Inject(REPOSITORIES.EXAMPLE_REPOSITORY)
    // private readonly exampleRepository: Repository<Example>,
    @Inject(DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createExampleDto.toEntity()); // 바로 이 코드!
      await queryRunner.commitTransaction();

      return null;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
