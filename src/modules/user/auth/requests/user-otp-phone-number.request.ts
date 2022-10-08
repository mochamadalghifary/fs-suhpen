import { PickType } from "@nestjs/swagger";
import { UserRequest } from "../../user/requests/user.request";

export class UserOtpRequest extends PickType(UserRequest, [
	'otp'
]) {}
