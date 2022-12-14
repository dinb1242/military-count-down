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
import { Request } from 'express';
import { WikiType } from "../common/enums/wiki-type.enum";

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
}
