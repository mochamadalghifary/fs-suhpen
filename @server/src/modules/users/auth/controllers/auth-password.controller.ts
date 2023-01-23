import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/src/infrastructure/interfaces/api.response'
import { Modules } from '@server/src/modules/modules'
import { UserResponse } from '../../user/responses/user.response'
import { AuthApp } from '../apps/auth.app'
import { AuthChangePasswordRequest } from '../requests/auth-change-password.request'
import { AuthEmailRequest } from '../requests/auth-email.request'

const THIS_MODULE = Modules.Auth + '/password'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
export class AuthPasswordController {
  constructor(private readonly authApp: AuthApp) {}

  @Post('send')
  async send(@Body() req: AuthEmailRequest): Promise<IApiRes<UserResponse>> {
    const link = await this.authApp.passwordSendLink(req)
    return ApiRes.all(link)
  }

  @Get(':token')
  async token(@Param('token') token: string): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordGetLink(token)
    return ApiRes.all(user)
  }

  @Put('change')
  async change(
    @Body() req: AuthChangePasswordRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordChange(req)
    return ApiRes.all(user)
  }
}
