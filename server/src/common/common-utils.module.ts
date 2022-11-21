import { Global, Module } from '@nestjs/common';
import { CipherUtils } from './utils/cipher.util';
import { TimeUtils } from './utils/time.util';
import { JwtUtils } from './utils/jwt.util';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [CipherUtils, TimeUtils, JwtUtils],
  exports: [CipherUtils, TimeUtils, JwtUtils],
})
export class CommonUtilsModule {}
