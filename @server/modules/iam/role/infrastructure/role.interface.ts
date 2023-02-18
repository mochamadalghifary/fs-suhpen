import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'
import { ERole } from './role.enum'

export interface IRole extends IBaseEntity {
  name: ERole
}
