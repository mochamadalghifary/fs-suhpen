import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from 'src/infrastructure/base/base-crud.controller';
import { IApiRes } from 'src/infrastructure/interfaces/api-responses.interface';
import { ApiRes } from 'src/infrastructure/interfaces/api.response';
import { Modules } from 'src/modules/modules';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { UserCrudApp } from '../apps/user-crud.app';
import { UserIndexRequest } from '../requests/user-index.request';
import { UserRequest } from '../requests/user.request';
import { UserResponse } from '../responses/user.response';

const THIS_MODULE = Modules.Users

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class UserCrudController implements BaseCrudController {
  constructor(private readonly userCrudApp: UserCrudApp) {}

  @Get()
  async fetch(@Query() req: UserIndexRequest): Promise<IApiRes<UserResponse[]>> {
    const res = await this.userCrudApp.fetch(req)
    return ApiRes.all(UserResponse.alls(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: UserRequest): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.create(req)
    return ApiRes.all(UserResponse.all(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.findOneOrFail(id)
    return ApiRes.all(UserResponse.all(data))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() req: UserRequest): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.update(id, req)
    return ApiRes.all(UserResponse.all(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.remove(id)
    return ApiRes.all(UserResponse.all(data))
  }
}
