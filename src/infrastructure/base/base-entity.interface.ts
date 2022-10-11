import { IAppUser } from "src/modules/users/user/interfaces/user.interface";

export interface IBaseEntity {
	id: string
	createdAt?: Date;
	createdBy?: IAppUser;
	updatedAt?: Date;
	updatedBy?: IAppUser;
	deletedAt?: Date;
	deletedBy?: IAppUser;
}
