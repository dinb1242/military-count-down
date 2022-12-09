import {ApiProperty} from "@nestjs/swagger";
import {Wiki} from '@prisma/client';
import {TimeUtils} from "../../../common/utils/time.util";

export class WikiResponseDto {
    constructor(wiki: any) {
        this.id = wiki.id;
        this.wikiContent = wiki.wikiContent;
        this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(wiki.createdAt);
        this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(wiki.updatedAt);
    }

    @ApiProperty({description: '위키 시퀀스'})
    readonly id: number;

    @ApiProperty({description: '위키 마크다운 내용'})
    readonly wikiContent: string;

    @ApiProperty({description: '생성일'})
    readonly createdAt: string;

    @ApiProperty({description: '수정일'})
    readonly updatedAt: string;
}