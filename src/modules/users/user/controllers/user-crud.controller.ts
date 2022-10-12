import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BaseCrudController } from 'src/infrastructure/base/base-crud.controller'
import { IApiResponse } from 'src/infrastructure/interfaces/responses.interface'
import { Modules } from 'src/modules/modules'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { UserCrudApp } from '../apps/user.app'
import { UserIndexRequest } from '../requests/user-index.request'
import { UserRequest } from '../requests/user.request'
import { UserResponse } from '../responses/user.response'

@Controller(Modules.Users)
@ApiTags(Modules.Users)
@UseGuards(AdminGuard)
export class UserCrudController implements BaseCrudController {
  constructor(private readonly userCrudApp: UserCrudApp) {}

  @Get()
  async fetch(
    @Query() req: UserIndexRequest,
  ): Promise<IApiResponse<UserResponse[]>> {
    const res = await this.userCrudApp.fetch(req)

    return {
      message: 'Success get data',
      data: UserResponse.fromEntities(res.data),
      meta: res.meta,
    }
  }

  @Post()
  async create(@Body() req: UserRequest): Promise<IApiResponse<UserResponse>> {
    const data = await this.userCrudApp.create(req)

    return {
      message: 'Success create data',
      data: UserResponse.fromEntity(data),
    }
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiResponse<UserResponse>> {
    const data = await this.userCrudApp.findOneOrFail(id)

    return {
      message: 'Success get data',
      data: UserResponse.fromEntity(data),
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: UserRequest,
  ): Promise<IApiResponse<UserResponse>> {
    const data = await this.userCrudApp.update(id, req)

    return {
      message: 'Success update data',
      data: UserResponse.fromEntity(data),
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiResponse<UserResponse>> {
    const data = await this.userCrudApp.delete(id)

    return {
      message: 'Success delete data',
      data: UserResponse.fromEntity(data),
    }
  }
}
