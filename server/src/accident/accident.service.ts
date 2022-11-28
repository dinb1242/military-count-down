import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectWikiResponseDto } from '../project/dto/response/project-wiki-response.dto';
import { ProjectWikiRevisionResponseDto } from '../project/dto/response/project-wiki-revision-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccidentService {
  async upsertWiki(
    user: any,
    projectId: number,
    projectWikiCreateInput: Prisma.ProjectWikiCreateInput,
  ): Promise<ProjectWikiResponseDto> {
    const { id: authorId } = user;

    const wikiRevisionObj: any = {
      projectWikiRevision: {
        create: {
          author: {
            connect: { id: authorId },
          },
          wikiContent: projectWikiCreateInput.wikiContent,
        },
      },
    };

    const wikiEntity = await this.prismaService.projectWiki.upsert({
      where: { projectId: projectId },
      create: {
        ...projectWikiCreateInput,
        ...wikiRevisionObj,
      },
      update: {
        wikiContent: projectWikiCreateInput.wikiContent,
        ...wikiRevisionObj,
      },
    });

    return new ProjectWikiResponseDto(wikiEntity);
  }

  async findWikiOfSpecificProject(projectId: number): Promise<ProjectWikiResponseDto> {
    const wikiEntity = await this.prismaService.projectWiki
      .findUniqueOrThrow({
        where: { projectId: projectId },
      })
      .catch(() => {
        throw new NotFoundException('일치하는 프로젝트를 찾을 수 없습니다. projectId=' + projectId);
      });

    return new ProjectWikiResponseDto(wikiEntity);
  }

  async findAllRevisionOfSpecificProject(projectWikiId: number) {
    const wikiRevisions: Array<any> = await this.prismaService.projectWikiRevision.findMany({
      where: { projectWikiId: projectWikiId },
      include: {
        projectWiki: true,
        author: true,
      },
    });

    return wikiRevisions.map((eachEntity) => new ProjectWikiRevisionResponseDto(eachEntity));
  }
}
