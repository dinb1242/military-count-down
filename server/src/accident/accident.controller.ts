import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { Request } from 'express';
import { AccidentWikiResponseDto } from './dto/response/accident-wiki-response.dto';
import { CreateAccidentWikiDto } from './dto/request/create-accident-wiki.dto';
import { AccidentWikiRevisionResponseDto } from './dto/response/accident-wiki-revision-response.dto';
import { UpdateAccidentWikiDto } from './dto/request/update-accident-wiki.dto';

@Controller('accident')
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('wiki')
  @ApiOperation({
    summary: '위키 등록 API',
    description:
      '사건 사고에 대한 위키를 등록한다. 이미 존재하는 위키일 경우, 수정하고 Revision 을 추가한다. 만일, 이미 존재하는 사건/사고 위키가 있을 경우 예외를 발생시킨다.',
  })
  @ApiOkResponse({
    description: '등록 성공',
    type: AccidentWikiResponseDto,
  })
  @ApiBadRequestResponse({ description: '생성 실패 - 기존재 사건/사고 위키 존재' })
  async createWiki(@Req() request: Request, @Body() requestDto: CreateAccidentWikiDto) {
    return this.accidentService.createWiki(request.user, {
      wikiContent: requestDto.wikiContent,
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Patch('wiki')
  @ApiOperation({
    summary: '사건/사고 위키 수정 API',
    description: '사건/사고에 대한 위키를 수정한다. 이때, 수정 이후에 Revision 을 추가한다.',
  })
  @ApiOkResponse({
    description: '수정 성공',
    type: AccidentWikiResponseDto,
  })
  @ApiBadRequestResponse({ description: '수정 실패 - 위키 중복' })
  async updateWiki(
    @Req() request: Request,
    @Body() requestDto: UpdateAccidentWikiDto,
  ): Promise<AccidentWikiResponseDto> {
    return this.accidentService.updateWiki(request.user, {
      wikiContent: requestDto.wikiContent,
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki')
  @ApiOperation({
    summary: '사건/사고 위키 조회 API',
    description: '등록된 사건/사고 위키를 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: AccidentWikiResponseDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패 - 사건/사고 위키 중복' })
  async findWikiOfSpecificAccident(): Promise<AccidentWikiResponseDto> {
    return this.accidentService.findWikiOfAccident();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/revision')
  @ApiOperation({
    summary: '위키 Revision 전체 조회 API',
    description: '사건/사고에 해당하는 Revision 목록을 전체 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: AccidentWikiRevisionResponseDto,
  })
  async findAllRevisionOfAccident() {
    return this.accidentService.findAllRevisionOfAccident();
  }
}
