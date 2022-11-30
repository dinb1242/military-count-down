import { Module } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AccidentController } from './accident.controller';

@Module({
  controllers: [AccidentController],
  providers: [AccidentService]
})
export class AccidentModule {}
