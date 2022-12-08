import { Module } from '@nestjs/common';
import { WikiService } from './wiki.service';
import { WikiController } from './wiki.controller';

@Module({
  controllers: [WikiController],
  providers: [WikiService]
})
export class WikiModule {}
