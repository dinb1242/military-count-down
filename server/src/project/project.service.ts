import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, Project as ProjectModel } from '@prisma/client';
import { ProjectResponseDto } from './dto/response/project-response.dto';
import { R2Utils } from "../common/utils/r2.util";

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService, private readonly r2Utils: R2Utils) {}

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
    const projectEntity: ProjectModel = await this.prismaService.project.findUniqueOrThrow(
      {
        where: {
          id: id
        },
        include: { file: true }
      }).catch(() => {
      throw new NotFoundException('일치하는 프로젝트를 찾을 수 없습니다.');
    });
    const { fileId } = projectEntity;
    await this.prismaService.project.delete({where: {id: id}})
      .then(async (res) => {
        // 파일이 존재한다면
        if (projectEntity.fileId) {
          // 파일을 제거한다.
          const { fileKey } = await this.prismaService.file.findUniqueOrThrow(
            {
              where: { id: fileId },
              select: {
                fileKey: true
              }
            })
            .catch(() => {
              throw new NotFoundException('해당 파일을 찾을 수 없습니다.');
            });

          // 파일 엔티티를 제거한다.
          await this.prismaService.file.delete({ where: { id: fileId } });

          // R2 에서 해당 파일을 제거한다.
          await this.r2Utils.deleteObject(fileKey);
        }
      })
    return new ProjectResponseDto(projectEntity);
  }
}
