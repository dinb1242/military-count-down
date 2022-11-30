import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AccidentWikiResponseDto } from './dto/response/accident-wiki-response.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { AccidentWikiRevisionResponseDto } from './dto/response/accident-wiki-revision-response.dto';

@Injectable()
export class AccidentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createWiki(
    user: any,
    accidentWikiCreateInput: Prisma.AccidentWikiCreateInput,
  ): Promise<AccidentWikiResponseDto> {
    // 이미 생성된 위키가 있다면 예외를 발생시킨다.
    await this.prismaService.accidentWiki.count().then((res) => {
      if (res > 0) throw new BadRequestException('이미 기존에 존재하는 사건/사고 위키 항목이 존재합니다.');
    });

    const { id: authorId } = user;

    const wikiRevisionObj: any = {
      accidentWikiRevision: {
        create: {
          author: {
            connect: { id: authorId },
          },
          wikiContent: accidentWikiCreateInput.wikiContent,
        },
      },
    };

    const wikiEntity = await this.prismaService.accidentWiki.create({
      data: {
        ...accidentWikiCreateInput,
        accidentWikiRevision: wikiRevisionObj,
      },
    });

    return new AccidentWikiResponseDto(wikiEntity);
  }

  async updateWiki(user: any, accidentWikiUpdateInput: Prisma.AccidentWikiUpdateInput) {
    const { authorId } = user.id;

    const wikiId: number = await this.prismaService.accidentWiki.findMany().then((res) => {
      if (res.length > 0) {
        throw new BadRequestException(
          '사건/사고 위키가 한 개 이상 존재합니다. 오동작입니다, 데이터베이스 점검이 필요합니다.',
        );
      } else {
        return res[0].id;
      }
    });

    const wikiEntity = await this.prismaService.accidentWiki.update({
      where: { id: wikiId },
      data: {
        ...accidentWikiUpdateInput,
        accidentWikiRevision: {
          create: {
            author: { connect: { id: authorId } },
            wikiContent: accidentWikiUpdateInput.wikiContent.toString(),
          },
        },
      },
    });

    return new AccidentWikiResponseDto(wikiEntity);
  }

  async findWikiOfAccident(): Promise<AccidentWikiResponseDto> {
    const wikiEntity = await this.prismaService.accidentWiki.findMany().then((res) => {
      if (res.length > 0) {
        throw new BadRequestException(
          '사건/사고 위키가 한 개 이상 존재합니다. 오동작입니다, 데이터베이스 점검이 필요합니다.',
        );
      } else {
        return res[0];
      }
    });

    return new AccidentWikiResponseDto(wikiEntity);
  }

  async findAllRevisionOfAccident() {
    const wikiRevisions: Array<any> = await this.prismaService.accidentWikiRevision.findMany({
      include: {
        accidentWiki: true,
        author: true,
      },
    });

    return wikiRevisions.map((eachEntity) => new AccidentWikiRevisionResponseDto(eachEntity));
  }
}
