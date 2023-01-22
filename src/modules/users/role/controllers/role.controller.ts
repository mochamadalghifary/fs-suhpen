import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from 'src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from 'src/infrastructure/interfaces/api.response'
import { Modules } from 'src/modules/modules'
import { Role } from 'src/modules/users/role/enums/role.enum'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { RoleApp } from '../apps/role.app'
import { IAppRole } from '../interfaces/role.interface'

const THIS_MODULE = Modules.Roles

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class RoleController {
  constructor(private readonly roleApp: RoleApp) {}

  @Get()
  async find(): Promise<IApiRes<IAppRole[]>> {
    const res = await this.roleApp.find()
    return ApiRes.from(res)
  }

  @Get(':name')
  async findOne(@Query('name') name: Role): Promise<IApiRes<IAppRole | undefined>> {
    const res = await this.roleApp.findOne(name)
    return ApiRes.from(res)
  }
}
