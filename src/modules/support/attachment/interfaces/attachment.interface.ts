import { IBaseEntity } from "src/infrastructure/base/base-entity.interface";

export interface IAppAttachment extends IBaseEntity {
	attachment: string;
	module: string;
}
