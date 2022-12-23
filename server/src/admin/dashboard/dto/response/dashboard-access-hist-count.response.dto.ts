import { ApiProperty } from "@nestjs/swagger";
import { AccessHistCountTypeEnum } from "../../enums/accessHistCountTypeEnum";

export class DashboardAccessHistCountResponseDto {
  constructor(type: AccessHistCountTypeEnum, date: string, count: number) {
    this.type = type;
    this.date = date;
    this.count = count;
  }

  @ApiProperty({ description: '조회 타입' })
  readonly type: AccessHistCountTypeEnum

  @ApiProperty({ description: '날짜' })
  readonly date: string;

  @ApiProperty({ description: '횟수' })
  readonly count: number;
}