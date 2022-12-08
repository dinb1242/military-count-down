import {Injectable} from '@nestjs/common';
import {PrismaService} from "../common/prisma/prisma.service";
import {Prisma} from '@prisma/client';
import {WikiResponseDto} from "./dto/response/wiki-response.dto";

@Injectable()
export class WikiService {
    constructor(private readonly prismaServie: PrismaService) {
    }

    async upsert(wikiCreateInput: Prisma.WikiCreateInput): Promise<WikiResponseDto> {
        const wikiEntity = await this.prismaServie.wiki.create({
            data: wikiCreateInput,
            include: {
                wikiRevision: true,
                coworker: true
            }
        });

        return new WikiResponseDto(wikiEntity);
    }
}
