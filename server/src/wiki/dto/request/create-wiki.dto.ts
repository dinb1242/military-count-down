import {ApiProperty} from "@nestjs/swagger";
import {WikiType} from "../../../common/enums/wiki-type.enum";

export class CreateWikiDto {
    @ApiProperty({ description: '게시글 시퀀스' })
    readonly bbsId: number;

    @ApiProperty({ description: '위키 타입' })
    readonly wikiType: WikiType;

    @ApiProperty({ description: '위키 마크다운' })
    readonly wikiContent;
}
