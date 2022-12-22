import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../common/prisma/prisma.service";
import { DashboardUserCountResponseDto } from "./dto/response/dashboard-user-count.response.dto";
import { AccessHistCountTypeEnum } from "./enums/accessHistCountTypeEnum";
import { Sql } from "prisma/prisma-client/runtime";

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async admUserCount(): Promise<DashboardUserCountResponseDto> {
    const userCount: number = await this.prismaService.user.count();
    return new DashboardUserCountResponseDto(userCount);
  }

  async admAccessHistCount(type: AccessHistCountTypeEnum): Promise<any> {
    const query = `
      SELECT DATE_TRUNC('month', createdAt), COUNT(*)
      FROM AccessHistory
      GROUP BY DATE_TRUNC('month', createdAt)
    `;
    // await this.prismaService.$queryRaw();
    return null;
  }
}
