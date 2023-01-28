import { IBaseEntity } from '@server/src/infrastructure/base/base-entity.interface'
import { Role } from '../../role/enums/role.enum'

export interface IAppUser extends IBaseEntity {
  name: string
  email: string
  password: string
  role: Role
  phoneNumber?: string
  avatar?: string
  address?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified: boolean
  token?: string
  _accessToken?: string
}
