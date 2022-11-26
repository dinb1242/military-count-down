import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { PrismaService } from './common/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpHeaders } from './common/enums/http-headers.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 역직렬화 적용 (TypeORM 기반 DTO toEntity 에서 유효)
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 커스텀 공통 Response Interceptor 및 공통 예외 처리 필터 적용
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // 프리즈마 서비스 전역 적용
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // 스웨거 설정
  const config = new DocumentBuilder()
    .setTitle('전역일 계산기 및 미림 위키 Swagger')
    .setDescription('전역일 계산기 및 미림 위키에 대한 OAS')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Bearer Access Token 을 입력해주세요.',
        name: HttpHeaders.AUTHORIZATION,
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080, '0.0.0.0');
}

bootstrap();
