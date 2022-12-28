import { ApiProperty } from "@nestjs/swagger";

export class DashboardUserCountResponseDto {
  constructor(userCount: number) {
    this.registeredUserCount = userCount;
  }

  @ApiProperty({ description: '가입 유저 수' })
  readonly registeredUserCount: number;
}