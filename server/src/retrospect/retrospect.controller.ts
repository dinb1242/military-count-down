import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { RetrospectService } from './retrospect.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { CreateRetrospectDto } from './dto/request/create-retrospect.dto';
import { RetrospectResponseDto } from './dto/response/retrospect-response.dto';
import { Request } from 'express';
import { UpdateRetrospectDto } from './dto/request/update-retrospect.dto';

@ApiTags('회고 API')
@Controller('retrospect')
export class RetrospectController {
  constructor(private readonly retrospectService: RetrospectService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '생성 API',
    description: '회고를 등록한다.',
  })
  @ApiCreatedResponse({ description: '생성 성공' })
  async create(@Req() request: Request, @Body() requestDto: CreateRetrospectDto): Promise<RetrospectResponseDto> {
    const { id: authorId }: any = request.user;
    return this.retrospectService.create({
      ...requestDto,
      author: { connect: { id: authorId } },
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get()
  @ApiOperation({
    summary: '전체 조회 API',
    description: '회고를 전체 조회한다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: RetrospectResponseDto, isArray: true })
  async findAll(): Promise<RetrospectResponseDto[]> {
    return this.retrospectService.findAll();
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get(':retrospectId')
  @ApiOperation({
    summary: '특정 조회 API',
    description: '특정 회고를 조회한다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: RetrospectResponseDto })
  @ApiNotFoundResponse({ description: '조회 실패 - 시퀀스 미조회' })
  async findOne(@Param('retrospectId') retrospectId: number): Promise<RetrospectResponseDto> {
    return this.retrospectService.findOne(retrospectId);
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Patch(':retrospectId')
  @ApiOperation({
    summary: '수정 API',
    description: '회고를 수정한다.',
  })
  @ApiOkResponse({ description: '수정 성공', type: RetrospectResponseDto })
  @ApiBadRequestResponse({ description: '수정 실패 -작성자와 수정자 미일치' })
  @ApiNotFoundResponse({ description: '수정 실패 - 시퀀스 미조회' })
  async update(
    @Req() request: Request,
    @Param('retrospectId') retrospectId: number,
    @Body() requestDto: UpdateRetrospectDto,
  ): Promise<RetrospectResponseDto> {
    const { id: authorId }: any = request.user;

    return this.retrospectService.update(authorId, retrospectId, {
      ...requestDto,
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Delete(':retrospectId')
  @ApiOperation({
    summary: '삭제 API',
    description: '특정 회고를 제거한다.',
  })
  @ApiOkResponse({ description: '제거 성공', type: RetrospectResponseDto })
  @ApiNotFoundResponse({ description: '제거 실패 - 시퀀스 미조회' })
  @ApiBadRequestResponse({ description: '제거 실패 - 작성자와 제거자 미일치' })
  async delete(@Req() request: Request, @Param('retrospectId') retrospectId: number): Promise<RetrospectResponseDto> {
    const { id: authorId }: any = request.user;

    return this.retrospectService.delete(authorId, retrospectId);
  }
}
