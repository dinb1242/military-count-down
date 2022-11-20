import { Global, Module } from '@nestjs/common';
import { CipherUtils } from './utils/cipher.util';
import { TimeUtils } from './utils/time.util';

@Global()
@Module({
  providers: [CipherUtils, TimeUtils],
  exports: [CipherUtils, TimeUtils],
})
export class CommonUtilsModule {}
