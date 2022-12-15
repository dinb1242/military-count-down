import { Controller, Get } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';
import { WikiResponseDto } from "../wiki/dto/response/wiki-response.dto";

@ApiTags('사건/사고 API')
@Controller('accident')
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Get('wiki')
  @ApiOperation({
    summary: '사건/사고 위키 조회 API',
    description: '등록된 사건/사고 위키를 조회한다. 사건/사고 위키는 단 한 개이며, 이에 따라 데이터베이스 내에서 사건/사고 위키 데이터 한 건을 조회한다.',
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: WikiResponseDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패 - 사건/사고 위키 중복' })
  async findWikiOfSpecificAccident(): Promise<WikiResponseDto> {
    return this.accidentService.findWikiOfAccident();
  }
}
