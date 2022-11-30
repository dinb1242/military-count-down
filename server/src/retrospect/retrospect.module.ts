import { Module } from '@nestjs/common';
import { RetrospectService } from './retrospect.service';
import { RetrospectController } from './retrospect.controller';

@Module({
  controllers: [RetrospectController],
  providers: [RetrospectService]
})
export class RetrospectModule {}
