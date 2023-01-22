import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { config } from 'src/config';

export const JwtModuleOption: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: `${config.auth.jwt.expiredInseconds}s`,
    },
  }),
  inject: [ConfigService],
}
