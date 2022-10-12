import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Exception } from 'src/common/exceptions/index.exception'
import { MailService } from '../../../support/mail/services/mail.service'
import { AppUser } from '../../user/entities/user.entity'
import { IAppUser } from '../../user/interfaces/user.interface'
import { UserService } from '../../user/services/user.service'
import { AuthChangePasswordRequest } from '../requests/auth-change-password.request'
import { AuthEmailRequest } from '../requests/auth-email.request'
import { AuthLoginRequest } from '../requests/auth-login.request'
import { AuthRegisterRequest } from '../requests/auth-register.request'
import { AuthEmailService } from '../services/auth-email.service'
import { AuthWhatsAppService } from '../services/auth-whatsapp.service'

@Injectable()
export class AuthApp {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly authWhatsAppService: AuthWhatsAppService,
    private readonly authEmailService: AuthEmailService,
  ) {}

  async register(req: AuthRegisterRequest): Promise<IAppUser> {
    const user = new AppUser()
    Object.assign(user, req)

    return await this.userService.create(user)
  }

  async login(req: AuthLoginRequest): Promise<IAppUser> {
    const { email, password } = req
    const user = await this.userService.findOneByEmail(email)

    !user && Exception.unprocessableEntity('Email atau Password Anda salah')
    !(await bcrypt.compare(password, user.password)) &&
      Exception.unprocessableEntity('Email atau Password Anda salah')

    user.token = await this.jwtService.signAsync({ id: user.id })

    return user
  }

  async passwordSendLink(req: AuthEmailRequest): Promise<IAppUser> {
    return await this.authEmailService.passwordSendLink(req)
  }

  async passwordGetLink(token: string): Promise<IAppUser> {
    return await this.userService.findOneByToken(token)
  }

  async passwordChange(req: AuthChangePasswordRequest): Promise<IAppUser> {
    const user = await this.userService.findOneByEmail(req.email)

    user.token != req.token && Exception.unprocessableEntity('Invalid token')
    !user &&
      Exception.unprocessableEntity('Email atau Nomor Telepon belum terdaftar')

    user.password = await bcrypt.hash(req.password, 10)
    user.token = null

    await this.userService.update(user)
    await this.mailService.sendSuccessChangePassword(user)

    return user
  }

  // async otpEmailSend(req: AuthEmailRequest): Promise<number> {
  // 	return await this.authEmailService.sendOtp(req);
  // }

  // async otpEmailVerify(req: AuthEmailRequest): Promise<IAppUser> {
  // 	return await this.authEmailService.verify(req);
  // }

  // async otpWhatsAppSend(@GetUserLogged() user?: IAppUser): Promise<void> {
  // 	await this.authWhatsAppService.send(user.phoneNumber);
  // }

  // async otpWhatsAppVerify(otp: number, @GetUserLogged() user?: IAppUser): Promise<IAppUser> {
  // 	return await this.authWhatsAppService.verify(otp, user);
  // }
}
