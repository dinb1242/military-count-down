import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, WikiRevision as WikiRevisionModel } from '@prisma/client';
import { WikiResponseDto } from './dto/response/wiki-response.dto';
import { WikiRevisionResponseDto } from "./dto/response/wiki-revision-response.dto";
import { WikiType } from "../common/enums/wiki-type.enum";

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

  /**
   * 사건/사고 위키
   */
  async createWiki(
    user: any,
    wikiCreateInput: Prisma.WikiCreateInput,
  ): Promise<WikiResponseDto> {
    // 이미 생성된 위키가 있다면 예외를 발생시킨다.
    await this.prismaService.wiki.count({
      where: { wikiType: WikiType.ACCIDENT }
    }).then((res) => {
      if (res > 0) throw new BadRequestException('이미 기존에 존재하는 사건/사고 위키 항목이 존재합니다.');
    });

    const { id: authorId } = user;

    const wikiEntity = await this.prismaService.wiki.create({
      data: {
        ...wikiCreateInput,
        wikiRevision: {
          create: {
            author: { connect: { id: authorId } },
            wikiContent: wikiCreateInput.wikiContent
          }
        }
      },
    });

    return new WikiResponseDto(wikiEntity);
  }

  async updateWiki(user: any, wikiUpdateInput: Prisma.WikiUpdateInput) {
    const { id: authorId } = user;

    const wikiId: number = await this.prismaService.wiki.findMany({
      where: { wikiType: WikiType.ACCIDENT }
    }).then((res) => {
      if (res.length > 1) {
        throw new BadRequestException(
          '사건/사고 위키가 한 개 이상 존재합니다. 오동작입니다, 데이터베이스 점검이 필요합니다.',
        );
      } else {
        return res[0].id;
      }
    });

    const wikiEntity = await this.prismaService.wiki.update({
      where: { id: wikiId },
      data: {
        ...wikiUpdateInput,
        wikiRevision: {
          create: {
            author: { connect: { id: authorId } },
            wikiContent: wikiUpdateInput.wikiContent.toString(),
          },
        },
      },
    });

    return new WikiResponseDto(wikiEntity);
  }

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
