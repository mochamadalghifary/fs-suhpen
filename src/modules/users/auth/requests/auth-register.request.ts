import { PickType } from '@nestjs/swagger'
import { Match } from '../../../../infrastructure/swagger/decorators/match.decorator'
import { UserRequest } from '../../user/requests/user.request'

export class AuthRegisterRequest extends PickType(UserRequest, [
  'name',
  'email',
  'password',
  'passwordConfirmation',
]) {
  @Match('password')
  passwordConfirmation!: string
}
