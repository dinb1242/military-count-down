import { Global, Module } from '@nestjs/common';
import { CipherUtils } from './utils/cipher.util';

@Global()
@Module({
  providers: [CipherUtils],
  exports: [CipherUtils],
})
export class CommonUtilsModule {}