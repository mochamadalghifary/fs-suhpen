import { IAppUser } from "src/modules/user/user/interfaces/user.interface";

export interface IAppBaseEntity {
	id: string
	createdAt?: Date;
	createdBy?: IAppUser;
	updatedAt?: Date;
	updatedBy?: IAppUser;
	deletedAt?: Date;
	deletedBy?: IAppUser;
}
