import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../common/prisma/prisma.service";
import { DashboardUserCountResponseDto } from "./dto/response/dashboard-user-count.response.dto";

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async admUserCount(): Promise<DashboardUserCountResponseDto> {
    const userCount: number = await this.prismaService.user.count();
    return new DashboardUserCountResponseDto(userCount);
  }
}
