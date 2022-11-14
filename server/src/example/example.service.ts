import { Injectable } from '@nestjs/common';
import { Prisma, Example as ExampleModel, Example, prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

// PR 테스트
@Injectable()
export class ExampleService {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async createExample(exampleCreateInput: Prisma.ExampleCreateInput): Promise<ExampleModel> {
    console.log(exampleCreateInput);
    return await this.prismaSerivce.example.create({
      data: exampleCreateInput,
    });
  }

  async updateExample(exampleWhereUniqueInput: Prisma.ExampleWhereUniqueInput, exampleUpdateInput: Prisma.ExampleUpdateInput) {
    return await this.prismaSerivce.example.update({
      where: exampleWhereUniqueInput,
      data: exampleUpdateInput,
    });
  }

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
    const [ totalElementCnt, exampleList ] = await this.prismaSerivce.$transaction([
      this.prismaSerivce.example.count(),
      this.prismaSerivce.example.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
    ])
    return exampleList;
  }
}
