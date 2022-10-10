import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { STRING_PASSWORD_CHARACTER } from '../../user/common/character.constant';
import { UserRequest } from '../../user/requests/user.request';

export class UserRegisterRequest extends PickType(UserRequest, [
  'email', 'password', 'name'
]) {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(STRING_PASSWORD_CHARACTER, {
    message: 'Password should contain number, under case, and upper case character',
  })
  @ApiProperty()
  passwordConfirmation: string;
}