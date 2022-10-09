import { PickType } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { UserRequest } from "../../user/requests/user.request";
import { IsExistEmail } from "../filters/user-exist-email.validatort";

export class UserOtpEmailRequest extends PickType(UserRequest, [
	'email', 'otp'
]) {
	@Validate(IsExistEmail)
	email: string
}
