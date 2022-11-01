import { Inject, Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { DATA_SOURCE } from '../constants/repository.constants';
import { DataSource, Repository } from 'typeorm';
import { Example } from './entities/example.entity';

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
      const exampleRepository: Repository<Example> = await queryRunner.manager.getRepository(Example);
      await exampleRepository.save(createExampleDto.toEntity());
      // throw new InternalServerErrorException();
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
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
