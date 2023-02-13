import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { Role } from '../../role/infrastructure/role.enum'

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
