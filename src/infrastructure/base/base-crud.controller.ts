import { IApiResponse } from '../interfaces/responses.interface'
import { IBaseEntity } from './base-entity.interface'

export abstract class BaseCrudController {
  abstract fetch(arg0: any, arg1: any): Promise<IApiResponse<IBaseEntity[]>>
  abstract create(arg0: any, arg1: any): Promise<IApiResponse<IBaseEntity>>
  abstract findOneOrFail(
    arg0: any,
    arg1: any,
  ): Promise<IApiResponse<IBaseEntity>>
  abstract update(arg0: any, arg1: any): Promise<IApiResponse<IBaseEntity>>
  abstract delete(arg0: any, arg1: any): Promise<IApiResponse<IBaseEntity>>
}
