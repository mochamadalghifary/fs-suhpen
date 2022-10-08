import { PickType } from "@nestjs/swagger";
import { UserRequest } from "../../user/requests/user.request";

export class UserLoginRequest extends PickType(UserRequest, [
	'email', 'password'
]) {}
