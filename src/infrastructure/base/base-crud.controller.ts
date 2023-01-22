import { IApiRes } from '../interfaces/api-responses.interface'
import { IBaseEntity } from './base-entity.interface'

export abstract class BaseCrudController {
  abstract fetch(...arg1: any): Promise<IApiRes<IBaseEntity[]>>
  abstract create(...arg1: any): Promise<IApiRes<IBaseEntity>>
  abstract findOneOrFail(...arg1: any): Promise<IApiRes<IBaseEntity>>
  abstract update(...arg1: any): Promise<IApiRes<IBaseEntity>>
  abstract delete(...arg1: any): Promise<IApiRes<IBaseEntity>>
}
