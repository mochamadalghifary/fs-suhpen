import { IBaseEntity } from "src/infrastructure/base/base-entity.interface";
import { IAppRole } from "../../role/interfaces/role.interface";

export interface IAppUser extends IBaseEntity {
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
	token?: string;
	_accessToken?: string;
}
