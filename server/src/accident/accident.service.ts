import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { WikiType } from "../common/enums/wiki-type.enum";
import { WikiResponseDto } from "../wiki/dto/response/wiki-response.dto";

@Injectable()
export class AccidentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findWikiOfAccident(): Promise<WikiResponseDto> {
    const wikiEntity = await this.prismaService.wiki.findFirstOrThrow({
      where: {
        wikiType: WikiType.ACCIDENT
      }
    }).catch(() => {
      throw new NotFoundException('등록된 사건/사고 위키가 존재하지 않습니다.');
    })

    return new WikiResponseDto(wikiEntity);
  }
}
