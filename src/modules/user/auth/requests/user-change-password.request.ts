import { OmitType } from '@nestjs/swagger';
import { UserRegisterRequest } from './user-register.request';

export class UserChangePasswordRequest extends OmitType(UserRegisterRequest, [
  'name'
]) {}
