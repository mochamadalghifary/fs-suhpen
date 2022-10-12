import { OmitType } from '@nestjs/swagger'
import { UserRequest } from './user.request'

export class UserUpdateRequest extends OmitType(UserRequest, [
  'email',
  'password',
  'role',
  'otp',
  'isVerified',
  'token',
]) {}
