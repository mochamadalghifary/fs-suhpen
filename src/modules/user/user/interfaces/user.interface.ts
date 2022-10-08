import { IAppBaseEntity } from "src/common/interfaces/index-entity.interface";
import { IAppRole } from "../../role/interfaces/role.interface";

export interface IAppUser extends IAppBaseEntity {
	name: string;
	email: string
	password: string
	role: IAppRole
	phoneNumber?: string;
	avatar?: string;
	address?: string
	otp?: number
	otpExpiredAt?: Date
	isVerified: boolean
	_accessToken?: string;
}
