import { PickType } from '@nestjs/swagger';
import { UserRequest } from '../../user/requests/user.request';

export class AuthRegisterRequest extends PickType(UserRequest, [
  'name', 'email', 'password', 'passwordConfirmation'
]) {}