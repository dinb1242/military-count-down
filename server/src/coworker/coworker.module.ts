import { Module } from '@nestjs/common';
import { CoworkerService } from './coworker.service';
import { CoworkerController } from './coworker.controller';

@Module({
  controllers: [CoworkerController],
  providers: [CoworkerService],
})
export class CoworkerModule {}
