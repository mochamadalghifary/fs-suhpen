import { PickType } from '@nestjs/swagger'
import { Match } from 'src/infrastructure/swagger/decorators/match.decorator'
import { UserRequest } from '../../user/requests/user.request'

export class AuthChangePasswordRequest extends PickType(UserRequest, [
  'email',
  'password',
  'passwordConfirmation',
  'token',
]) {
  @Match('password')
  passwordConfirmation: string
}
