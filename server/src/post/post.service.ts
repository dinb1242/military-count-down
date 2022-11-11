import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: { skip?: number; take?: number; cursor?: Prisma.PostWhereUniqueInput; where?: Prisma.PostWhereInput; orderBy?: Prisma.PostOrderByWithRelationInput }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }): Promise<Post> {
    const { where, data } = params;
    return await this.prisma.post.update({
      where,
      data,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({
      where,
    });
  }
}
