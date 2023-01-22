import { PickType } from '@nestjs/swagger'
import { UserRequest } from '../../user/requests/user.request'

export class AuthLoginRequest extends PickType(UserRequest, [
  'email',
]) {
  password!: string
}
