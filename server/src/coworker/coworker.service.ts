import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Coworker as CoworkerModel, DevPart, Prisma } from '@prisma/client';
import { CoworkerResponseDto } from './dto/response/coworker-response.dto';

@Injectable()
export class CoworkerService {
  constructor(private readonly prismaService: PrismaService) {
  }

  /**
   *
   * @param coworkerCreateInput 요청 전문
   * @return 유저 응답 DTO
   */
  async create(coworkerCreateInput: Prisma.CoworkerCreateInput): Promise<CoworkerResponseDto> {
    const {...data} = coworkerCreateInput;

    if (!Object.values(DevPart).includes(data.devPart)) {
      throw new BadRequestException(`Enum 타입이 일치하지 않습니다. devPart=${data.devPart}`);
    }

    // 이미 동일한 개발자가 있는지 체크한다.
    await this.prismaService.coworker
      .findUnique({
        where: {name: data.name},
      })
      .then((res) => {
        if (res) throw new BadRequestException('동일한 개발자가 존재합니다.');
      });

    // 데이터를 저장한다.
    const coworkerEntity: CoworkerModel = await this.prismaService.coworker.create({
      data,
    });

    return new CoworkerResponseDto(coworkerEntity);
  }

  /**
   * @return 모든 개발자 데이터를 반환한다.
   */
  async findAll(): Promise<CoworkerResponseDto[]> {
    const coworkerEntityList = await this.prismaService.coworker.findMany({
      orderBy: {createdAt: 'desc'},
      include: {
        file: true,
      },
    });

    return coworkerEntityList.map((value) => new CoworkerResponseDto(value));
  }

  async findOne(id: number): Promise<CoworkerResponseDto> {
    const coworkerEntity: CoworkerModel = await this.prismaService.coworker
      .findUniqueOrThrow({
        where: {id: id},
        include: {file: true},
      })
      .catch(() => {
        throw new NotFoundException('일치하는 개발자를 찾을 수 없습니다.');
      });

    return new CoworkerResponseDto(coworkerEntity);
  }

  async update(id: number, coworkerUpdateInput: Prisma.CoworkerUpdateInput): Promise<CoworkerResponseDto> {
    // 해당하는 id 가 존재하는지 확인한다.
    await this.prismaService.coworker.findUniqueOrThrow({where: {id: id}}).catch(() => {
      throw new NotFoundException('일치하는 개발자를 찾을 수 없습니다.');
    });

    // 유저를 업데이트한다.
    const updatedCoworkerEntity: CoworkerModel = await this.prismaService.coworker.update({
      where: {id: id},
      data: coworkerUpdateInput,
    });

    return new CoworkerResponseDto(updatedCoworkerEntity);
  }

  async delete(id: number): Promise<CoworkerResponseDto> {
    const coworkerEntity: CoworkerModel = await this.prismaService.coworker.findUniqueOrThrow(
      {
        where: {
          id: id
        },
        include: { file: true }
      }).catch(() => {
      throw new NotFoundException('일치하는 개발자를 찾을 수 없습니다.');
    });
    const { fileId } = coworkerEntity;
    await this.prismaService.coworker.delete({where: {id: id}});

    return new CoworkerResponseDto(coworkerEntity);
  }
}
