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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilename,
    }),
    ExampleModule,
    UserModule,
    PostModule,
    AuthModule,
    CommonUtilsModule,
    PrismaModule,
    CoworkerModule,
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
export class AppModule {}
