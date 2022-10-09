import { PickType } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { UserRequest } from "../../user/requests/user.request";
import { IsExistEmail } from "../filters/user-exist-email.validatort";

export class UserEmailRequest extends PickType(UserRequest, [
	'email'
]) {
	@Validate(IsExistEmail)
	email: string
}
