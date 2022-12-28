import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from "../../common/prisma/prisma.service";
import { DashboardUserCountResponseDto } from "./dto/response/dashboard-user-count.response.dto";
import { AccessHistCountTypeEnum } from "./enums/accessHistCountTypeEnum";
import { convert, LocalDate, LocalDateTime } from "js-joda";
import { DashboardAccessHistCountResponseDto } from "./dto/response/dashboard-access-hist-count.response.dto";

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {
  }

  /**
   * 관리자페이지 내 가입한 유저 수를 조회한다.
   */
  async admUserCount(): Promise<DashboardUserCountResponseDto> {
    const userCount: number = await this.prismaService.user.count();
    return new DashboardUserCountResponseDto(userCount);
  }

  /**
   * 전체 / 월별 / 최근 7일 별 접속자 수 통계를 조회한다.
   * @param type 조회 타입
   */
  async admAccessHistCount(type: AccessHistCountTypeEnum): Promise<DashboardAccessHistCountResponseDto | DashboardAccessHistCountResponseDto[]> {

    switch (type) {
      case AccessHistCountTypeEnum.ALL:
        const wholeCounts = await this.prismaService.accessHistory.count();
        return new DashboardAccessHistCountResponseDto(type, null, wholeCounts);

      case AccessHistCountTypeEnum.WEEKLY:
        const before7Days: Date = convert(LocalDateTime.now().minusWeeks(1)).toDate();
        const weeklyHist = await this.prismaService.$queryRaw`
            SELECT to_char(date_trunc('day', "createdAt"), 'yyyy-MM-dd') AS date, COUNT(*) AS count
            FROM military_count_down."AccessHistory"
            WHERE date_trunc('day', "createdAt") >= ${before7Days}
            GROUP BY date_trunc('day', "createdAt")
            ORDER BY date_trunc('day', "createdAt");
        `.then((result: [{ date: string, count: number }]) => {
          return result.map(eachResult => {
            eachResult.count = Number(eachResult.count);
            return eachResult;
          })
        });
        return weeklyHist.map(eachHist => {
          return new DashboardAccessHistCountResponseDto(type, eachHist.date, eachHist.count);
        });

      case AccessHistCountTypeEnum.MONTHLY:
        const currentYear = LocalDate.now().year();
        const currentYearStart = new Date(currentYear, 0, 1);
        const nextYearStart = new Date(currentYear + 1, 0, 1);
        const defaultMonthHist: DashboardAccessHistCountResponseDto[] = [];
        for (let i = 1; i <= 12; i++) {
          defaultMonthHist.push({
            date: `${currentYear}-${i.toString().padStart(2, '0')}`,
            count: 0,
            type
          })
        }
        const monthlyHist = await this.prismaService.$queryRaw`
            SELECT to_char(date_trunc('month', "createdAt"), 'yyyy-MM') AS date, COUNT(*) as count
            FROM military_count_down."AccessHistory"
            WHERE "createdAt" >= ${currentYearStart} AND "createdAt" < ${nextYearStart}
            GROUP BY date_trunc('month', "createdAt")
            ORDER BY date_trunc('month', "createdAt")
        `.then((result: [{ date: string, count: number }]) => {
          result.map(eachResult => {
            eachResult.count = Number(eachResult.count)
            return eachResult;
          })
          return result;
        })

        for await (const eachDefaultHist of defaultMonthHist) {
          for await (const eachMonthlyHist of monthlyHist) {
            if (eachDefaultHist.date === eachMonthlyHist.date) {
              eachDefaultHist.count = eachMonthlyHist.count;
            }
          }
        }

        return defaultMonthHist.map(eachHist => {
          return new DashboardAccessHistCountResponseDto(type, eachHist.date, eachHist.count);
        });
      default:
        throw new BadRequestException('일치하는 Enum 타입을 찾을 수 없습니다. type=' + type);
    }
  }
}
