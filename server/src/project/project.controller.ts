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
import { WikiType } from "../common/enums/wiki-type.enum";

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
  async create(@Req() request: Request, @Body() requestDto: CreateProjectDto): Promise<ProjectResponseDto> {
    const { id: userId }: any = request.user;
    return this.projectService.create({
      ...requestDto,
      wiki: {
        create: {
          wikiType: WikiType.PROJECT,
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
    description: '프로젝트를 생성일 내림차순으로 전체 조회한다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: ProjectResponseDto, isArray: true })
  async findAll(): Promise<ProjectResponseDto[]> {
    return this.projectService.findAll();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get(':id')
  @ApiOperation({
    summary: '특정 조회 API',
    description: '프로젝트 시퀀스를 전달받아 특정 프로젝트를 반환한다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: ProjectResponseDto })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
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
}
