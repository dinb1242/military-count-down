import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CommonUtilsModule } from 'src/common/common-utils.module';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
