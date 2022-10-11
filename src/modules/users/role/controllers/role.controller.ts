import {
    Controller, Get, Param, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IApiResponse } from 'src/infrastructure/interfaces/responses.interface';
import { Modules } from 'src/modules/modules';
import { Role } from 'src/modules/users/role/enums/role.enum';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { IAppRole } from '../interfaces/role.interface';
import { RoleService } from '../services/role.service';

@Controller(Modules.Roles)
@ApiTags(Modules.Roles)
@UseGuards(AdminGuard)
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Get()
    async find(): Promise<IApiResponse<IAppRole[]>> {
        const res = await this.roleService.find()

        return {
            message: 'Success get data',
            data: res
        }
    }

    @Get(':name')
    async findOne(@Param() name: Role): Promise<IApiResponse<IAppRole>> {
        const res = await this.roleService.findOne(name)

        return {
            message: 'Success get data',
            data: res
        }
    }
}