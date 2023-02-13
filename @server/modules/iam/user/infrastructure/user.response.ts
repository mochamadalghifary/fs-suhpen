import { OmitType } from '@nestjs/swagger'
import { IAppUser } from '../infrastructure/user.interface'
import { AppUser } from './user.entity'

export class UserResponse extends OmitType(AppUser, ['password']) {
  otpExpiredAt?: Date
  _accessToken?: string

  static fromEntity(data: IAppUser): UserResponse {
    const res = new UserResponse()
    Object.assign(res, data)

    res._accessToken = data.token

    return res
  }

  static fromEntities(data: IAppUser[]): UserResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
