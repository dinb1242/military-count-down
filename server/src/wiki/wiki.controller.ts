import { BadRequestException, Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { WikiService } from './wiki.service';
import { CreateWikiDto } from './dto/request/create-wiki.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { CoworkerWikiResponseDto } from '../coworker/dto/response/coworker-wiki-response.dto';
import { Request } from 'express';
import { WikiType } from '../common/enums/wiki-type.enum';
import { Prisma } from '@prisma/client';
import { WikiResponseDto } from "./dto/response/wiki-response.dto";
import { WikiRevisionResponseDto } from "./dto/response/wiki-revision-response.dto";

@ApiTags('위키 API')
@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService) {
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '위키 등록 및 수정 API',
    description: '특정 위키 타입에 대한 위키를 등록한다. 이미 존재하는 위키일 경우, 수정하고 Revision 을 추가한다.',
  })
  @ApiOkResponse({
    description: '등록 성공',
    type: CoworkerWikiResponseDto,
  })
  async upsert(@Req() request: Request, @Body() requestDto: CreateWikiDto) {
    const {id: userId}: any = request.user;
    let relation = {};

    switch (requestDto.wikiType) {
      case WikiType.COWORKER:
        relation = {
          coworker: {
            connect: {id: requestDto.bbsId},
          },
        };
        break;
      case WikiType.PROJECT:
        relation = {
          project: {
            connect: {id: requestDto.bbsId},
          },
        };
        break;
      case WikiType.ACCIDENT:
        relation = {
          accident: {
            connect: {id: requestDto.bbsId},
          },
        };
        break;
      case WikiType.RETROSPECT:
        relation = {
          retrospect: {
            connect: {id: requestDto.bbsId},
          },
        };
        break;
      default:
        throw new BadRequestException('일치하는 위키 타입을 찾을 수 없습니다. wikiType=' + requestDto.wikiType);
    }

    return this.wikiService.upsert({
      wikiContent: requestDto.wikiContent,
      wikiType: requestDto.wikiType,
      ...relation,
      wikiRevision: {
        create: {
          wikiContent: requestDto.wikiContent,
          author: {connect: {id: userId}},
        },
      },
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get(':bbsType/:bbsId')
  @ApiOperation({
    summary: '특정 위키 조회 API',
    description: 'bbsType 과 bbsId 를 전달받아 해당하는 위키를 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: CoworkerWikiResponseDto,
  })
  @ApiParam({
    name: 'bbsType',
    enum: WikiType,
    description: '위키 타입'
  })
  @ApiNotFoundResponse({description: '조회 실패 - 시퀀스 미조회'})
  async findOneWiki(
    @Param('bbsType') bbsType: WikiType,
    @Param('bbsId') bbsId: number,
  ): Promise<WikiResponseDto> {

    let wikiWhereInput: Prisma.WikiWhereInput;

    switch (bbsType) {
      case WikiType.COWORKER:
        wikiWhereInput = {
          coworker: {
            id: bbsId
          },
          wikiType: WikiType.COWORKER
        }
        break;
      // FIXME: 하기 항목들 스키마에 정의한 이후 수정할 것.
      case WikiType.PROJECT:
        wikiWhereInput = {
          coworker: {
            id: bbsId
          },
          wikiType: WikiType.COWORKER
        }
        break;
      case WikiType.ACCIDENT:
        wikiWhereInput = {
          coworker: {
            id: bbsId
          },
          wikiType: WikiType.COWORKER
        }
        break;
      case WikiType.RETROSPECT:
        wikiWhereInput = {
          coworker: {
            id: bbsId
          },
          wikiType: WikiType.COWORKER
        }
        break;
    }

    return this.wikiService.findOneWiki({
      where: {
        ...wikiWhereInput
      }
    });
  }


  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('revision/many/:wikiId')
  @ApiOperation({
    summary: '특정 위키 Revision 전체 조회 API',
    description: '특정 위키에 해당하는 Revision 목록을 전체 조회한다.',
  })
  @ApiOkResponse({
    description: '',
    type: WikiRevisionResponseDto,
    isArray: true
  })
  async findAllWikiRevisions(@Param('wikiId') wikiId: number) {
    return this.wikiService.findAllWikiRevisions({
      where: {
        wikiId
      },
      include: {
        author: true
      }
    })
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('revision/one/:wikiRevisionId')
  @ApiOperation({
    summary: '특정 위키 Revision 조회 API',
    description: '특정 위키 Revision 을 조회한다. '
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: WikiRevisionResponseDto
  })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findOneWikiRevision(@Param('wikiRevisionId') wikiRevisionId: number): Promise<WikiRevisionResponseDto> {
    return this.wikiService.findOneWikiRevision({
      where: { id: wikiRevisionId },
      include: {
        author: true
      }
    });
  }
}
