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
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { BaseCrudController } from 'src/infrastructure/module/base-crud.controller';
import { Routes } from 'src/modules/routes';
import { AdministratorGuard } from '../../auth/guards/administrator.guard';
import { UserCrudApp } from '../apps/user.app';
import { UserIndexRequest } from '../requests/user-index.request';
import { UserRequest } from '../requests/user.request';
import { UserResponse } from '../responses/user.response';

@Controller(Routes.Users)
@ApiTags(Routes.Users)
@UseGuards(AdministratorGuard)
export class UserCrudController implements BaseCrudController {
	constructor(
		private readonly userCrudApp: UserCrudApp,
	) {}

	@Get()
	async fetch(
		@Query() req: UserIndexRequest
	): Promise<IApiResponse<UserResponse[]>> {
		const res = await this.userCrudApp.fetch(req);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntities(res.data),
			meta: res.meta
		};
	}

	@Post()
	async create(
		@Body() req: UserRequest,
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.userCrudApp.create(req);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}

	@Get(':id')
	async findOneOrFail(
		@Param('id') id: string,
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.userCrudApp.findOneOrFail(id);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() req: UserRequest,
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.userCrudApp.update(id, req);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}

	@Delete(':id')
	async delete(
		@Param('id') id: string,
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.userCrudApp.delete(id);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}
}
