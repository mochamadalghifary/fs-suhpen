import { PickType } from "@nestjs/swagger";
import { UserRequest } from "../../user/requests/user.request";

export class UserEmailOtpRequest extends PickType(UserRequest, [
	'email', 'otp'
]) {}
