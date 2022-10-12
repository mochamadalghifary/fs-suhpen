import { DeleteResult } from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export abstract class BaseService {
  abstract create(arg0: any, arg1: any): Promise<IBaseEntity>
  abstract find(): Promise<IBaseEntity[]>
  abstract findOne(arg0: any, arg1: any): Promise<IBaseEntity>
  abstract findOneOrFail(arg0: any, arg1: any): Promise<IBaseEntity>
  abstract update(arg0: any, arg1: any): Promise<IBaseEntity>
  abstract delete(arg0: any, arg1: any): Promise<DeleteResult>
  abstract softDelete(arg0: any, arg1: any): Promise<DeleteResult>
}
