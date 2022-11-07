import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { DatabaseModule } from '../commons/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
