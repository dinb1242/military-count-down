import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
import { UpdateCoworkerWikiDto } from './dto/request/update-coworker-wiki.dto';

@ApiTags('함께한 개발자 API')
@Controller('coworker')
export class CoworkerController {
  constructor(private readonly coworkerService: CoworkerService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '생성 API',
    description: '함께한 개발자 데이터를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '생성 성공',
    type: CoworkerResponseDto,
  })
  @ApiBadRequestResponse({ description: '생성 실패 - 중복된 개발자' })
  async create(@Body() requestDto: CreateCoworkerDto): Promise<CoworkerResponseDto> {
    return this.coworkerService.create(requestDto);
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
  @Post('wiki/:id')
  @ApiOperation({
    summary: '위키 등록 API',
    description: '특정 개발자의 시퀀스를 전달받아 해당 개발자에 대한 위키를 등록한다.',
  })
  @ApiOkResponse({
    description: '등록 성공',
    type: CoworkerResponseDto,
  })
  async createWiki(@Param('id') id: number, @Body() requestDto: CreateCoworkerWikiDto) {
    return this.coworkerService.createWiki({
      wiki: requestDto.wikiContent,
      coworker: {
        connect: { id: id },
      },
    });
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Patch('wiki/:id')
  @ApiOperation({
    summary: '위키 수정',
    description: 'Path Variable 로 개발자 시퀀스를 전달받고, 수정할 위키 내용을 Body 로 전달받아 위키를 수정한다.',
  })
  @ApiOkResponse({
    description: '수정 성공',
    type: CoworkerResponseDto,
  })
  @ApiNotFoundResponse({ description: '수정 실패 - 시퀀스 미조회' })
  async updateWiki(@Param('id') id: number, @Body() requestDto: UpdateCoworkerWikiDto) {
    return this.coworkerService.updateWiki(id, {});
  }
}
