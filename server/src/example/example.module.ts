import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  // imports: [DatabaseModule],
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
