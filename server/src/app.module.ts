import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './example/example.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { CipherUtils } from './common/utils/cipher.util';
import { CommonUtilsModule } from './common/common-utils.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CoworkerModule } from './coworker/coworker.module';
import { ProjectModule } from './project/project.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// 환경 변수 별 상수 설정
let envFilename = '';
if (process.env.NODE_ENV === 'local') {
  Logger.log('로컬 환경으로 실행되었습니다.');
  envFilename = '.env-local';
} else if (process.env.NODE_ENV === 'dev') {
  Logger.log('개발 환경으로 실행되었습니다.');
  envFilename = '.env-dev';
}

@Module({
  imports: [
    // .env 파일을 전역적으로 사용할 수 있도록 적용한다.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilename,
    }),
    // 정적 파일을 /statics 라우트로 제공한다.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/statics',
    }),
    ExampleModule,
    UserModule,
    PostModule,
    AuthModule,
    CommonUtilsModule,
    PrismaModule,
    CoworkerModule,
    ProjectModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CipherUtils,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
