import { PickType } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { UserRequest } from "../../user/requests/user.request";
import { IsExistPhoneNumber } from "../filters/user-exist-phone-number.validator";

export class UserOtpRequest extends PickType(UserRequest, [
	'otp'
]) {
	@Validate(IsExistPhoneNumber)
	email: string
}
