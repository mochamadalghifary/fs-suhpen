import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'
import { ERole } from './role.enum'

export interface IAppRole extends IBaseEntity {
  name: ERole
}
