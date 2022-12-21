import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DashboardUserCountResponseDto } from "./dto/response/dashboard-user-count.response.dto";
import { AdminApi } from "../../common/decorators/admin-api.decorator";

@ApiTags('[관리자] 대시보드 API')
@Controller('adm/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}


  @AdminApi({
    summary: '가입 유저 수 조회 API',
    description: '관리자페이지 내 대시보드에서 가입한 유저 수를 반환한다.'
  })
  @Get('user-count')
  @ApiOkResponse({
    type: DashboardUserCountResponseDto,
    description: '조회 성공'
  })
  async admUserCount(): Promise<DashboardUserCountResponseDto> {
    return this.dashboardService.admUserCount();
  }

  // @AdminApi({
  //   summary: '주간/월별/전체 방문자 통계',
  //   description: '방문자 통계를 조회한다. 중복 로그인도 모두 포함한다.'
  // })
  // @Get('access-hist-count')
  // @ApiOkResponse({ description: '조회 성공'})

}
