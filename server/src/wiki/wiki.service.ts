import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, WikiRevision as WikiRevisionModel } from '@prisma/client';
import { WikiResponseDto } from './dto/response/wiki-response.dto';
import { WikiRevisionResponseDto } from "./dto/response/wiki-revision-response.dto";

@Injectable()
export class WikiService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async update(wikiWhereInput: Prisma.WikiWhereInput, wikiUpdateInput: Prisma.WikiUpdateInput): Promise<WikiResponseDto> {

    // 해당하는 위키 엔티티를 조회하여 시퀀스를 가져온다.
    const wikiId: number = await this.prismaService.wiki.findFirst({
      select: {id: true},
      where: wikiWhereInput
    }).then(res => res.id);

    const wikiEntity = await this.prismaService.wiki.update({
      where: {id: wikiId},
      data: wikiUpdateInput
    });

    return new WikiResponseDto(wikiEntity);
  }

  async findOneWiki(wikiFindFirstArgsBase: Prisma.WikiFindFirstArgsBase): Promise<WikiResponseDto> {
    const wikiEntity = await this.prismaService.wiki.findFirst(wikiFindFirstArgsBase);
    return new WikiResponseDto(wikiEntity);
  }

  async findAllWikiRevisions(wikiRevisionFindManyArgs: Prisma.WikiRevisionFindManyArgs): Promise<WikiRevisionResponseDto[]> {
    const wikiRevisionEntityList: WikiRevisionModel[] = await this.prismaService.wikiRevision.findMany(wikiRevisionFindManyArgs);
    return wikiRevisionEntityList.map(eachEntity => new WikiRevisionResponseDto(eachEntity));
  }

  async findOneWikiRevision(wikiRevisionFindUniqueOrThrowArgs: Prisma.WikiRevisionFindUniqueOrThrowArgs): Promise<WikiRevisionResponseDto> {
    const wikiRevisionEntity = await this.prismaService.wikiRevision.findUniqueOrThrow(wikiRevisionFindUniqueOrThrowArgs)
      .catch(() => {
        throw new NotFoundException('일치하는 Revision 을 찾을 수 없습니다.');
      });

    return new WikiRevisionResponseDto(wikiRevisionEntity);
  }
}
