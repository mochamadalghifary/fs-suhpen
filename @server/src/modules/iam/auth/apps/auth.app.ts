import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from '@server/src/config'
import * as bcrypt from 'bcrypt'
import { Exception } from '../../../../common/exceptions/index.exception'
import { MailService } from '../../../support/mail/services/mail.service'
import { AppUser } from '../../user/entities/user.entity'
import { IAppUser } from '../../user/interfaces/user.interface'
import { UserService } from '../../user/services/user.service'
import { authMessages } from '../messages/auth.message'
import { AuthChangePasswordRequest } from '../requests/auth-change-password.request'
import { AuthEmailRequest } from '../requests/auth-email.request'
import { AuthLoginRequest } from '../requests/auth-login.request'
import { AuthRegisterRequest } from '../requests/auth-register.request'

@Injectable()
export class AuthApp {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(req: AuthRegisterRequest): Promise<IAppUser> {
    const user = new AppUser()
    Object.assign(user, req)

    return await this.userService.create(user)
  }

  async login(req: AuthLoginRequest): Promise<IAppUser> {
    const { email, password } = req
    const user = await this.userService.findOneByEmail(email)

    !user && Exception.unauthorized(authMessages.wrongCredential)
    const isValid = await bcrypt.compare(password, user?.password || '')
    !isValid && Exception.unauthorized(authMessages.wrongCredential)
    !user && Exception.unauthorized()

    user.token = await this.jwtService.signAsync({ id: user.id })

    return user
  }

  async passwordSendLink(req: AuthEmailRequest): Promise<string> {
    const user = await this.userService.findOneByEmail(req.email)
    if (!user) return 'Failed'

    user.token = await this.jwtService.signAsync({ id: user.id })
    const link = `${config.server.hostApi}/auth/password/${user.token}`

    await this.userService.update(user)
    await MailService.passwordResetLink(user, link)

    return link
  }

  async passwordGetLink(token: string): Promise<IAppUser | string> {
    const user = await this.userService.findOneByToken(token)
    if (!user) return authMessages.tokenInvalid
    return user
  }

  async passwordChange(
    req: AuthChangePasswordRequest,
  ): Promise<IAppUser | string> {
    const user = await this.userService.findOneByToken(req.token)
    if (!user) return authMessages.tokenInvalid

    user.token != req.token &&
      Exception.unprocessable(authMessages.tokenInvalid)
    user.password = await bcrypt.hash(req.password, 10)
    user.token = null

    await this.userService.update(user)
    await MailService.passwordResetSuccess(user)

    return user
  }
}
