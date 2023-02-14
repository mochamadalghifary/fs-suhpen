import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { ERole } from '../../../Enums/Role.enum'

class UserResponse implements IAppUser {
  id: string
  name: string
  email: string
  password: string
  role: ERole
  phoneNumber?: string
  avatar?: string
  address?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified: boolean
  token?: string
  _accessToken?: string
}

export default UserResponse
