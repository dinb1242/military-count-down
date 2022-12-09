import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { CoworkerService } from './coworker.service';
import { CreateCoworkerDto } from './dto/request/create-coworker.dto';
import { CoworkerResponseDto } from './dto/response/coworker-response.dto';
import { UpdateCoworkerDto } from './dto/request/update-coworker.dto';
import { CreateCoworkerWikiDto } from './dto/request/create-coworker-wiki.dto';
import { CoworkerWikiResponseDto } from './dto/response/coworker-wiki-response.dto';
import { Request } from 'express';
import { CoworkerWikiRevisionResponseDto } from './dto/response/coworker-wiki-revision-response.dto';
import {WikiType} from "../common/enums/wiki-type.enum";

@ApiTags('함께한 개발자 API')
@Controller('coworker')
export class CoworkerController {
  constructor(private readonly coworkerService: CoworkerService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '생성 API - File(Optional)',
    description: '함께한 개발자 데이터를 생성한다. 개발자의 프로필 이미지는 파일 업로드 API 를 활용한다.',
  })
  @ApiCreatedResponse({
    description: '생성 성공',
    type: CoworkerResponseDto,
  })
  @ApiBadRequestResponse({ description: '생성 실패 - 중복된 개발자' })
  async create(@Req() request: Request, @Body() requestDto: CreateCoworkerDto): Promise<CoworkerResponseDto> {
    const { id: userId }: any = request.user;

    return this.coworkerService.create({
      ...requestDto,
      wiki: {
        create: {
          wikiType: WikiType.COWORKER,
          wikiContent: '',
          wikiRevision: {
            create: {
              author: { connect: { id: userId } },
              wikiContent: ''
            }
          }
        }
      }
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get()
  @ApiOperation({
    summary: '전체 조회 API',
    description: '함께한 개발자들을 전체 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: CoworkerResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CoworkerResponseDto[]> {
    return this.coworkerService.findAll();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get(':id')
  @ApiOperation({
    summary: '특정 조회 API',
    description: '아이디를 Path Variable 로 전달받아 해당하는 개발자에 대한 상세 정보를 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: CoworkerResponseDto,
  })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findOne(@Param('id') id: number): Promise<CoworkerResponseDto> {
    return this.coworkerService.findOne(id);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Patch(':id')
  @ApiOperation({
    summary: '수정 API',
    description: '유저의 시퀀스와 수정할 내용을 전달받아 해당하는 데이터를 수정한다.',
  })
  @ApiOkResponse({
    description: '수정 성공',
    type: CoworkerResponseDto,
  })
  @ApiNotFoundResponse({ description: '수정 실패 - 시퀀스 미조회' })
  async update(@Param('id') id: number, @Body() requestDto: UpdateCoworkerDto): Promise<CoworkerResponseDto> {
    return this.coworkerService.update(id, requestDto);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Delete(':id')
  @ApiOperation({
    summary: '제거 API',
    description: '해당하는 개발자 데이터를 데이터베이스에서 영구 제거한다.',
  })
  @ApiOkResponse({
    description: '제거 성공',
    type: CoworkerResponseDto,
  })
  @ApiNotFoundResponse({ description: '제거 실패 - 시퀀스 미조회' })
  async delete(@Param('id') id: number): Promise<CoworkerResponseDto> {
    return this.coworkerService.delete(id);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('wiki/:coworkerId')
  @ApiOperation({
    summary: '위키 등록 및 수정 API',
    description:
      '특정 개발자의 시퀀스를 전달받아 해당 개발자에 대한 위키를 등록한다. 이미 존재하는 위키일 경우, 수정하고 Revision 을 추가한다.',
  })
  @ApiOkResponse({
    description: '등록 성공',
    type: CoworkerWikiResponseDto,
  })
  async upsertWiki(
    @Req() request: Request,
    @Param('coworkerId') coworkerId: number,
    @Body() requestDto: CreateCoworkerWikiDto,
  ) {
    return this.coworkerService.upsertWiki(request.user, coworkerId, {
      wikiContent: requestDto.wikiContent,
      coworker: {
        connect: { id: coworkerId },
      },
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/:coworkerId')
  @ApiOperation({
    summary: '특정 개발자 위키 조회 API',
    description: '개발자의 시퀀스를 Path Var 로 전달받아 해당하는 개발자의 위키를 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: CoworkerWikiResponseDto,
  })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findWikiOfSpecificCoworker(@Param('coworkerId') coworkerId: number): Promise<CoworkerWikiResponseDto> {
    return this.coworkerService.findWikiOfSpecificCoworker(coworkerId);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/revision/:coworkerWikiId')
  @ApiOperation({
    summary: '위키 Revision 전체 조회 API',
    description: '특정 개발자에 해당하는 Revision 목록을 전체 조회한다.',
  })
  @ApiOkResponse({
    description: '',
    type: CoworkerWikiRevisionResponseDto,
  })
  async findAllRevisionOfSpecificCoworker(@Param('coworkerWikiId') coworkerWikiId: number) {
    return this.coworkerService.findAllRevisionOfSpecificCoworker(coworkerWikiId);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/revision/one/:revisionId')
  @ApiOperation({
    summary: '특정 위키 Revision 조회 API',
    description: '특정 위키 Revision 을 조회한다. '
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: CoworkerWikiRevisionResponseDto
  })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findOneRevisionOfSpecificCoworker(@Param('revisionId') revisionId: number): Promise<CoworkerWikiRevisionResponseDto> {
    return this.coworkerService.findOneRevisionOfSpecificCoworker(revisionId);
  }
}
