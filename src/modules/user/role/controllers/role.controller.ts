import {
    Controller, Get, Param, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { Routes } from 'src/modules/routes';
import { AdministratorGuard } from '../../auth/guards/administrator.guard';
import { IAppRole } from '../interfaces/role.interface';
import { RoleService } from '../services/role.service';

@Controller(Routes.Roles)
@ApiTags(Routes.Roles)
@UseGuards(AdministratorGuard)
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