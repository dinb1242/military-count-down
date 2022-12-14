import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('게시글 API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return await this.postService.posts({ where: { published: true } });
  }

  @Get('filter/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    return await this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  //
  // @Post()
  // async draftPost(@Body() postData: CreatePostDto) {
  // const { title, content, authorEmail } = postData;
  // return await this.postService.createPost({
  //   title,
  //   content,
  //   author: {
  //     connect: { email: authorEmail },
  //   },
  // });
  // }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.deletePost({
      id: Number(id),
    });
  }
}
