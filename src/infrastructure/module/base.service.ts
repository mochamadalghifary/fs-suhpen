import { IAppBaseEntity } from "src/common/interfaces/index-entity.interface";
import { DeleteResult } from "typeorm";

export abstract class BaseService {
  abstract find(): Promise<IAppBaseEntity[]>
  abstract findOne(arg0: any, arg1: any): Promise<IAppBaseEntity>
  abstract findOneOrFail(arg0: any, arg1: any): Promise<IAppBaseEntity>
  abstract create(arg0: any, arg1: any): Promise<IAppBaseEntity>
  abstract update(arg0: any, arg1: any): Promise<IAppBaseEntity>
  abstract delete(arg0: any, arg1: any): Promise<DeleteResult>
}