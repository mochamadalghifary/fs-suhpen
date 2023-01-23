import { PickType } from '@nestjs/swagger'
import { UserRequest } from '../../user/requests/user.request'

export class AuthEmailRequest extends PickType(UserRequest, ['email']) {}
