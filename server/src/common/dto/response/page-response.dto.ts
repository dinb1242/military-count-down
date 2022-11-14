import { ApiProperty } from "@nestjs/swagger";

export class PageResponseDto<T> {

    @ApiProperty({ description: '전체 요소 개수' })
    readonly totalElementCnt: number;
    
    @ApiProperty({ description: '전체 페이지 개수' })
    readonly totalPageCnt: number;

    @ApiProperty({ description: '마지막 조회 아이디' })
    readonly lastId: number;

    @ApiProperty({ description: '요청한 요소 개수' })
    readonly requestedElementCnt: number;

    @ApiProperty({ description: '요청한 마지막 조회 아이디' })
    readonly requestedLastId: number;

    @ApiProperty({ description: '데이터' })
    readonly contents: T;
}