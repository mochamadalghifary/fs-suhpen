import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppUser } from '../user/entities/user.entity'
import { UserService } from '../user/services/user.service'
import { AuthApp } from './apps/auth.app'
import { JwtModuleOption } from './configs/jwt-module.config'
import { AuthPasswordController } from './controllers/auth-password.controller'
import { AuthController } from './controllers/auth.controller'
import { AuthPasswordService } from './services/auth-password.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUser]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtModuleOption),
  ],
  controllers: [
    AuthPasswordController,
    AuthController
  ],
  providers: [
    UserService,
    AuthApp,
    JwtStrategy,
    AuthPasswordService
  ],
  exports: [],
})
export class AuthModule {}
