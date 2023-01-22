import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from 'src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from 'src/infrastructure/interfaces/api.response'
import { Modules } from 'src/modules/modules'
import { UserResponse } from '../../user/responses/user.response'
import { AuthApp } from '../apps/auth.app'
import { AuthLoginRequest } from '../requests/auth-login.request'
import { AuthRegisterRequest } from '../requests/auth-register.request'

const THIS_MODULE = Modules.Auth

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
export class AuthController {
  constructor(private readonly authApp: AuthApp) {}

  @Post('login')
  async login(
    @Body() req: AuthLoginRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.login(req)
    return ApiRes.from(UserResponse.all(user))
  }

  @Post('register')
  async register(
    @Body() req: AuthRegisterRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.register(req)
    return ApiRes.from(UserResponse.all(user))
  }
}
