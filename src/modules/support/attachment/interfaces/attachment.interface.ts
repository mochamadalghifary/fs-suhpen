import { IAppBaseEntity } from "src/common/interfaces/index-entity.interface";

export interface IAppAttachment extends IAppBaseEntity {
	attachment: string;
	module: string;
}
