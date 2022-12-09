import { UserResponseDto } from "../../../user/dto/response/user-response.dto";
import { TimeUtils } from "../../../common/utils/time.util";
import { ApiProperty } from "@nestjs/swagger";

export class WikiRevisionResponseDto {
    constructor(wikiRevision: any) {
        this.id = wikiRevision.id;
        this.authorId = wikiRevision.authorId;
        this.wikiId = wikiRevision.coworkerWikiId;
        this.wikiContent = wikiRevision.wikiContent;
        // this.coworkerWiki = new CoworkerWikiResponseDto(wikiRevision.coworkerWiki);
        this.author = new UserResponseDto(wikiRevision.author);
        this.createdAt = TimeUtils.convertDateToLocalDateTimeStr(wikiRevision.createdAt);
        // this.updatedAt = TimeUtils.convertDateToLocalDateTimeStr(wikiRevision.updatedAt);
    }

    @ApiProperty({ description: '리비전 시퀀스' })
    id: number;

    @ApiProperty({ description: '작성자 시퀀스' })
    authorId: number;

    @ApiProperty({ description: '위키 시퀀스' })
    wikiId: number;

    @ApiProperty({ description: '위키 마크다운 내용' })
    wikiContent: string | null;

    // @ApiProperty({ description: '부모 위키 DTO' })
    // wiki: CoworkerWikiResponseDto;

    @ApiProperty({ description: '작성자 정보 DTO' })
    author: UserResponseDto;

    @ApiProperty({ description: '생성일' })
    createdAt: string;

    // @ApiProperty({ description: '수정일' })
    // updatedAt: string;
}