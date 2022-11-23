import { ApiProperty } from '@nestjs/swagger';
import { DevPart } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateCoworkerDto {
  @IsString()
  @ApiProperty({ description: '실명', example: '최용호' })
  readonly name: string;

  @ApiProperty({ description: '개발 파트', enum: DevPart })
  @IsString()
  readonly devPart: DevPart;

  @ApiProperty({ description: '프로젝트' })
  @IsArray()
  readonly projects: Array<string>;
}
