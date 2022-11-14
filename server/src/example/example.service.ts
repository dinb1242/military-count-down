import { Injectable } from '@nestjs/common';
import { Prisma, Example as ExampleModel, Example } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

// PR 테스트
@Injectable()
export class ExampleService {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async findExample(exampleWhereUniqueInput: Prisma.ExampleWhereUniqueInput): Promise<ExampleModel> {
    return await this.prismaSerivce.example.findUnique({
      where: exampleWhereUniqueInput,
    });
  }

  async findExamples(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExampleWhereUniqueInput;
    where?: Prisma.ExampleWhereInput;
    orderBy?: Prisma.ExampleOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaSerivce.example.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createExample(example: Prisma.ExampleCreateInput): Promise<ExampleModel> {
    return await this.prismaSerivce.example.create({
      data: example,
    });
  }

  async updateExample(id: Prisma.ExampleWhereUniqueInput | number, data: Prisma.ExampleUpdateInput) {
    return await this.prismaSerivce.example.update({
      where: { id: Number(id) },
      data: data,
    });
  }
}
