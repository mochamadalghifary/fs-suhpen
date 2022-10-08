import { PartialType } from '@nestjs/swagger';
import { UserRegisterRequest } from './user-register.request';

export class UserChangePasswordRequest extends PartialType(UserRegisterRequest) {}
