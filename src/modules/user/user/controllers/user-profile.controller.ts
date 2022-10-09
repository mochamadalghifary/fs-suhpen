import {
	Body,
	Controller,
	Get,
	Param,
	Put,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IApiResponse } from 'src/infrastructure/interfaces/responses.interface';
import { Routes } from 'src/modules/routes';
import { UserCrudApp } from '../apps/user.app';
import { GetUserLogged } from '../common/get-user.decorator';
import { IAppUser } from '../interfaces/user.interface';
import { UserRequest } from '../requests/user.request';
import { UserResponse } from '../responses/user.response';

@Controller(Routes.Profile)
@ApiTags(Routes.Profile)
@UseGuards(AuthGuard())
export class UserProfileController {
	constructor(
		private readonly UserCrudApp: UserCrudApp,
	) {}

	@Get()
	async GetUserLogged(
		@GetUserLogged() userLogged: IAppUser
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.UserCrudApp.findOneOrFail(userLogged.id);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}

	@Put()
	async update(
		@Param('id') id: string,
		@Body() req: UserRequest,
	): Promise<IApiResponse<UserResponse>> {
		const data = await this.UserCrudApp.update(id, req);

		return {
			message: 'Success get data',
			data: UserResponse.fromEntity(data),
		};
	}
}
