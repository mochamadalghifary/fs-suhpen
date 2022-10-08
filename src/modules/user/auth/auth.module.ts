import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModuleOption } from 'src/common/configs/http-module.config';
import { MailModule } from '../../support/mail/mail.module';
import { AppUser } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthApp } from './apps/auth.app';
import { JwtModuleOption } from './configs/jwt-module.config';
import { AuthController } from './controllers/auth.controller';
import { AuthEmailService } from './services/auth-email.service';
import { AuthWhatsAppService } from './services/auth-whatsapp.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([AppUser]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync(JwtModuleOption),
        HttpModule.registerAsync(HttpModuleOption),
        MailModule,
    ],
    controllers: [AuthController],
    providers: [
        UserService,
        AuthApp,
        JwtStrategy,
        AuthEmailService,
        AuthWhatsAppService
    ],
    exports: [AuthApp, PassportModule, JwtStrategy, UserService],
})
export class AuthModule {}
