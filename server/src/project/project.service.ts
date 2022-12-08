import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ProjectResponseDto } from './dto/response/project-response.dto';
import { ProjectWikiResponseDto } from './dto/response/project-wiki-response.dto';
import { ProjectWikiRevisionResponseDto } from './dto/response/project-wiki-revision-response.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectCreateInput: Prisma.ProjectCreateInput): Promise<ProjectResponseDto> {
    const projectEntity = await this.prismaService.project.create({ data: projectCreateInput });

    return new ProjectResponseDto(projectEntity);
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projectEntityList = await this.prismaService.project.findMany({
      include: { file: true },
      orderBy: { createdAt: 'desc' },
    });

    return projectEntityList.map((eachEntity) => new ProjectResponseDto(eachEntity));
  }

  async findOne(id: number): Promise<ProjectResponseDto> {
    const projectEntity = await this.prismaService.project
      .findUniqueOrThrow({ where: { id: id }, include: { file: true } })
      .catch(() => {
        throw new NotFoundException('일치하는 프로젝트를 찾을 수 없습니다. projectId=' + id);
      });

    return new ProjectResponseDto(projectEntity);
  }

  async update(id: number, projectUpdateInput: Prisma.ProjectUpdateInput) {
    await this.prismaService.project.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('일치하는 프로젝트를 찾을 수 없습니다. projectId=' + id);
    });

    const projectEntity = await this.prismaService.project.update({
      where: { id: id },
      data: projectUpdateInput,
    });

    return new ProjectResponseDto(projectEntity);
  }

  async delete(id: number): Promise<ProjectResponseDto> {
    await this.prismaService.project.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('일치하는 프로젝트를 찾을 수 없습니다. projectId=' + id);
    });

    const projectEntity = await this.prismaService.project.delete({ where: { id: id } });

    return new ProjectResponseDto(projectEntity);
  }

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
