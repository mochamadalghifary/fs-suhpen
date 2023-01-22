import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from 'src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from 'src/infrastructure/interfaces/api.response'
import { Modules } from 'src/modules/modules'
import { LoggedInGuard } from '../../auth/guards/logged-in.guard'
import { UserCrudApp } from '../apps/user-crud.app'
import { GetUserLogged } from '../common/get-user.decorator'
import { IAppUser } from '../interfaces/user.interface'
import { UserUpdateRequest } from '../requests/user.request'
import { UserResponse } from '../responses/user.response'

const THIS_MODULE = Modules.Profile

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(LoggedInGuard)
export class UserProfileController {
  constructor(private readonly userCrudApp: UserCrudApp) {}

  @Get()
  async GetUserLogged(
    @GetUserLogged() user: IAppUser,
  ): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.findOneOrFail(user.id)
    return ApiRes.from(UserResponse.all(data))
  }

  @Put()
  async update(
    @GetUserLogged() user: IAppUser,
    @Body() req: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.update(user.id, req)
    return ApiRes.from(UserResponse.all(data))
  }
}
