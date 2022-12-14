import { Global, Module } from '@nestjs/common';
import { CipherUtils } from './utils/cipher.util';
import { TimeUtils } from './utils/time.util';
import { JwtUtils } from './utils/jwt.util';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { R2Utils } from "./utils/r2.util";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: {
          expiresIn: '60s',
          issuer: 'Jihyun, Jeong',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CipherUtils, TimeUtils, JwtUtils, R2Utils],
  exports: [CipherUtils, TimeUtils, JwtUtils, R2Utils],
})
export class CommonUtilsModule {}
