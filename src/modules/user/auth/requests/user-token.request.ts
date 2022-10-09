import { PickType } from '@nestjs/swagger';
import { UserRequest } from '../../user/requests/user.request';

export class UserTokenRequest extends PickType(UserRequest, [
	'accessToken'
]) {}
