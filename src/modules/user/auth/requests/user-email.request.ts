import { PickType } from "@nestjs/swagger";
import { UserRequest } from "../../user/requests/user.request";

export class UserEmailRequest extends PickType(UserRequest, [
	'email'
]) {}
