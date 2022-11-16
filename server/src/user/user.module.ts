import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../common/prisma/prisma.module';
import { CipherUtils } from 'src/common/utils/cipher.util';
import { CommonUtilsModule } from 'src/common/common-utils.module';

@Module({
  imports: [CommonUtilsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
