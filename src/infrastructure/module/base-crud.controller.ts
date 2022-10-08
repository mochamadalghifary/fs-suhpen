import { IAppBaseEntity } from "src/common/interfaces/index-entity.interface";
import { IApiResponse } from "src/common/interfaces/response.interface";

export abstract class BaseCrudController {
  abstract fetch(arg0: any, arg1: any): Promise<IApiResponse<IAppBaseEntity[]>>
  abstract create(arg0: any, arg1: any): Promise<IApiResponse<IAppBaseEntity>>
  abstract findOneOrFail(arg0: any, arg1: any): Promise<IApiResponse<IAppBaseEntity>>
  abstract update(arg0: any, arg1: any): Promise<IApiResponse<IAppBaseEntity>>
  abstract delete(arg0: any, arg1: any): Promise<IApiResponse<IAppBaseEntity>>
}