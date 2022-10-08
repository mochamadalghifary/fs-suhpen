import { IAppRole } from "../../role/interfaces/role.interface";
import { IAppUser } from "../interfaces/user.interface";

export class UserResponse implements IAppUser {
	id: string;
	name: string;
	email: string
	password: string
	role: IAppRole
	address: string
	phoneNumber: string;
	otp: number
	otpExpiredAt?: Date
	isVerified: boolean
	accessToken?: string;

	static fromEntity(model: IAppUser): UserResponse {
		const res = new UserResponse()

		res.id = model.id
		res.name = model.name
		res.email = model.email
		res.password = null
		res.role = model.role
		res.address = model.address
		res.phoneNumber = model.phoneNumber
		res.otp = model.otp
		res.otpExpiredAt = model.otpExpiredAt
		res.isVerified = model.isVerified
		res.accessToken = model.accessToken

		return res
	}

	static fromEntities(models: IAppUser[]): UserResponse[] {
		return models.map((model) => this.fromEntity(model));
	}
}
