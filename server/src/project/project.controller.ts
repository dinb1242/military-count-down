import { Controller, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpHeaders } from '../common/enums/http-headers.enum';

@ApiTags('진행한 프로젝트 API')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @ApiBearerAuth(HttpHeaders.AUTHORIZATION)
  @Post()
  @ApiOperation({
    summary: '생성 API',
    description: '진행한 프로젝트를 생성한다.',
  })
  @ApiCreatedResponse({ description: '생성 성공' })
  async create() {
    return null;
  }
}
