import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { TimeUtils } from '../../../common/utils/time.util';

export class UserResponseDto {
  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.phone = user.phone;
    this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(user.createdAt);
    this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(user.updatedAt);
  }

  @ApiProperty({ description: '유저 시퀀스' })
  readonly id: number;

  @ApiProperty({ description: '유저 이메일' })
  readonly email: string;

  @ApiProperty({ description: '유저 실명' })
  readonly name: string;

  @ApiProperty({ description: '유저 휴대번호' })
  readonly phone: string;

  @ApiProperty({ description: '유저 생성일' })
  readonly createdAt: string;

  @ApiProperty({ description: '유저 수정일' })
  readonly updatedAt: string;
}
