import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { WikiResponseDto } from './dto/response/wiki-response.dto';
import { WikiType } from '../common/enums/wiki-type.enum';

@Injectable()
export class WikiService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert(wikiCreateInput: Prisma.WikiCreateInput): Promise<WikiResponseDto> {
    const wikiEntity = await this.prismaService.wiki.create({
      data: wikiCreateInput,
      include: {
        wikiRevision: true,
        coworker: true,
      },
    });

    return new WikiResponseDto(wikiEntity);
  }

  async findOneWiki(bbsType: WikiType, bbsId: number, test: Prisma.WikiFindFirstArgsBase): Promise<WikiResponseDto> {
    await this.prismaService.wiki.findFirst({
      where: {  }
    })

  }
}
