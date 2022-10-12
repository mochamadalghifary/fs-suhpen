import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions } from '@nestjs/jwt'

export const JwtModuleOption: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: `${configService.get('JWT_EXPIRES_IN')}s`,
    },
  }),
  inject: [ConfigService],
}
