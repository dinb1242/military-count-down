import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { ProjectResponseDto } from './dto/response/project-response.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';
import { Request } from 'express';
import { CreateProjectWikiDto } from './dto/request/create-project-wiki.dto';
import { ProjectWikiResponseDto } from './dto/response/project-wiki-response.dto';
import { ProjectWikiRevisionResponseDto } from './dto/response/project-wiki-revision-response.dto';

@ApiTags('진행한 프로젝트 API')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '생성 API - File(Optional)',
    description: '진행한 프로젝트를 생성한다. 필요한 경우 파일을 업로드 할 수 있다.',
  })
  @ApiCreatedResponse({ description: '생성 성공', type: ProjectResponseDto })
  async create(@Body() requestDto: CreateProjectDto): Promise<ProjectResponseDto> {
    return this.projectService.create({
      title: requestDto.title,
      content: requestDto.content,
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get()
  @ApiOperation({
    summary: '전체 조회 API',
    description: '프로젝트를 생성일 내림차순으로 전체 조회한다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: ProjectResponseDto, isArray: true })
  async findAll(): Promise<ProjectResponseDto[]> {
    return this.projectService.findAll();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Patch(':id')
  @ApiOperation({
    summary: '수정 API',
    description: 'Path Variable 로 프로젝트 시퀀스를 전달받아 해당하는 프로젝트의 내용을 수정한다.',
  })
  @ApiOkResponse({ description: '수정 성공', type: ProjectResponseDto })
  @ApiNotFoundResponse({ description: '수정 실패 - 시퀀스 미조회' })
  async update(@Param('id') id: number, @Body() requestDto: UpdateProjectDto): Promise<ProjectResponseDto> {
    return this.projectService.update(id, {
      title: requestDto.title,
      content: requestDto.content,
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Delete(':id')
  @ApiOperation({
    summary: '삭제 API',
    description: 'Path Variable 로 특정 시퀀스를 전달받아 해당하는 프로젝트를 제거한다.',
  })
  @ApiOkResponse({ description: '삭제 성공', type: ProjectResponseDto })
  @ApiNotFoundResponse({ description: '삭제 실패 - 시퀀스 미조회' })
  async delete(@Param('id') id: number): Promise<ProjectResponseDto> {
    return this.projectService.delete(id);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post('wiki/:projectId')
  @ApiOperation({
    summary: '위키 등록 및 수정 API',
    description:
      '특정 프로젝트의 시퀀스를 전달받아 해당 프로젝트에 대한 위키를 등록한다. 이미 존재하는 위키일 경우, 수정하고 Revision 을 추가한다.',
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
