import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
