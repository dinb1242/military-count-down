import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

// import dotenv = require('dotenv');
// dotenv.config();
//
// if (process.env.NODE_ENV === 'local') {
//   Logger.log('서버가 로컬 환경에서 동작합니다.');
//   dotenv.config({ path: path.join(__dirname, '../.env-local') });
// } else if (process.env.NODE_ENV === 'dev') {
//   Logger.log('서버가 개발 환경에서 동작합니다.');
//   dotenv.config({ path: path.join(__dirname, '../.env-dev') });
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8080);
}

bootstrap();
