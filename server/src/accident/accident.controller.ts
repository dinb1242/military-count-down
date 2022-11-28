import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { ProjectWikiResponseDto } from '../project/dto/response/project-wiki-response.dto';
import { Request } from 'express';
import { CreateProjectWikiDto } from '../project/dto/request/create-project-wiki.dto';
import { ProjectWikiRevisionResponseDto } from '../project/dto/response/project-wiki-revision-response.dto';

@Controller('accident')
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('wiki')
  @ApiOperation({
    summary: '위키 등록 및 수정 API',
    description:
      '사건 사고에 대한 위키를 등록한다. 이미 존재하는 위키일 경우, 수정하고 Revision 을 추가한다.',
  })
  @ApiOkResponse({
    description: '등록 성공',
    type: ProjectWikiResponseDto,
  })
  async upsertWiki(
    @Req() request: Request,
    @Param('projectId') projectId: number,
    @Body() requestDto: CreateProjectWikiDto,
  ) {
    return this.projectService.upsertWiki(request.user, projectId, {
      wikiContent: requestDto.wikiContent,
      project: {
        connect: { id: projectId },
      },
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/:projectId')
  @ApiOperation({
    summary: '특정 개발자 위키 조회 API',
    description: '개발자의 시퀀스를 Path Var 로 전달받아 해당하는 개발자의 위키를 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: ProjectWikiResponseDto,
  })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findWikiOfSpecificProject(@Param('projectId') projectId: number): Promise<ProjectWikiResponseDto> {
    return this.projectService.findWikiOfSpecificProject(projectId);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki/revision/:projectWikiId')
  @ApiOperation({
    summary: '위키 Revision 전체 조회 API',
    description: '특정 프로젝트에 해당하는 Revision 목록을 전체 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: ProjectWikiRevisionResponseDto,
  })
  async findAllRevisionOfSpecificProject(@Param('projectWikiId') projectWikiId: number) {
    return this.projectService.findAllRevisionOfSpecificProject(projectWikiId);
  }
}
