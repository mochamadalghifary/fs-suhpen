import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'
import { Role } from './role.enum'

export interface IAppRole extends IBaseEntity {
  name: Role
}
