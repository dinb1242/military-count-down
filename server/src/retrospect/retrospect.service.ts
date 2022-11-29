import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RetrospectResponseDto } from './dto/response/retrospect-response.dto';

@Injectable()
export class RetrospectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(retrospectCreateInput: Prisma.RetrospectCreateInput) {
    const retrospectEntity = await this.prismaService.retrospect.create({
      data: retrospectCreateInput,
    });

    return new RetrospectResponseDto(retrospectEntity);
  }

  async findAll(): Promise<RetrospectResponseDto[]> {
    const retrospectEntityList = await this.prismaService.retrospect.findMany({ orderBy: { createdAt: 'desc' } });

    return retrospectEntityList.map((eachEntity) => new RetrospectResponseDto(eachEntity));
  }

  async findOne(retrospectId: number): Promise<RetrospectResponseDto> {
    const retrospectEntity = await this.prismaService.retrospect
      .findUniqueOrThrow({ where: { id: retrospectId } })
      .catch(() => {
        throw new NotFoundException('일치하는 회고를 찾을 수 없습니다. retrospectId=' + retrospectId);
      });

    return new RetrospectResponseDto(retrospectEntity);
  }

  async update(authorId: number, retrospectId: number, retrospectUpdateInput: Prisma.RetrospectUpdateInput) {
    await this.prismaService.retrospect
      .findUniqueOrThrow({ where: { id: retrospectId } })
      .then((res) => {
        if (res.authorId !== authorId)
          throw new BadRequestException(
            `작성자와 수정자가 일치하지 않습니다. authorId=${res.authorId}, currentUpdaterId=${authorId}`,
          );
      })
      .catch(() => {
        throw new NotFoundException('일치하는 회고를 찾을 수 없습니다. retrospectId=' + retrospectId);
      });

    const retrospectEntity = await this.prismaService.retrospect.update({
      where: { id: retrospectId },
      data: retrospectUpdateInput,
    });

    return new RetrospectResponseDto(retrospectEntity);
  }

  async delete(authorId: number, retrospectId: number): Promise<RetrospectResponseDto> {
    await this.prismaService.retrospect
      .findUniqueOrThrow({ where: { id: retrospectId } })
      .then((res) => {
        if (res.authorId !== authorId)
          throw new BadRequestException(
            `작성자와 제거자가 일치하지 않습니다. authorId=${res.authorId}, currentUpdaterId=${authorId}`,
          );
      })
      .catch(() => {
        throw new NotFoundException('일치하는 회고를 찾을 수 없습니다. retrospectId=' + retrospectId);
      });

    const retrospectEntity = await this.prismaService.retrospect.delete({ where: { id: retrospectId } });

    return new RetrospectResponseDto(retrospectEntity);
  }
}
