import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/src/infrastructure/interfaces/api.response'
import { Role } from '@server/src/modules/iam/role/infrastructure/role.enum'
import { Modules } from '@server/src/modules/modules'
import { AdminGuard } from '../../auth/common/admin.guard'
import { IAppRole } from '../infrastructure/role.interface'
import { RoleService } from '../infrastructure/role.service'

const THIS_MODULE = Modules.Roles

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async find(): Promise<IApiRes<IAppRole[]>> {
    const res = await this.roleService.find()
    return ApiRes.all(res)
  }

  @Get(':name')
  async findOne(
    @Query('name') name: Role,
  ): Promise<IApiRes<IAppRole | undefined>> {
    const res = await this.roleService.findOne(name)
    return ApiRes.all(res)
  }
}
