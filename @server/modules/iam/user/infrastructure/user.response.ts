import { IAppUser } from '../infrastructure/user.interface'
import { AppUser } from './user.entity'

export class UserResponse extends AppUser {
  otpExpiredAt?: Date
  _accessToken?: string

  static fromEntity(data: IAppUser): UserResponse {
    const res = new UserResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token

    res._accessToken = data.token

    return res
  }

  static fromEntities(data: IAppUser[]): UserResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}

export class UserStrictResponse extends UserResponse {
  otpExpiredAt?: Date

  static fromEntity(data: IAppUser): UserResponse {
    const res = new UserResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token
    delete res._accessToken

    return res
  }

  static fromEntities(data: IAppUser[]): UserResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
