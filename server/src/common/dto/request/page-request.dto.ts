import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PageRequestDto {
    @ApiProperty({ description: '가져올 개수', example: '10', default: '10' })
    readonly elementCnt: number;

    @ApiPropertyOptional({ description: '마지막 요소 아이디', example: '1' })
    readonly lastId: number;
}