import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Role } from '@server/modules/iam/role/infrastructure/role.enum'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength
} from 'class-validator'
import { STRING_PASSWORD_CHARACTER } from '../common/character.constant'
import { IAppUser } from '../infrastructure/user.interface'

export class UserIndexRequest extends IndexRequest {}

export class UserRequest implements IAppUser {
  id: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]+$/)
  @ApiProperty({ example: 'Frado' })
  name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'Admin@admin.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(STRING_PASSWORD_CHARACTER, {
    message:
      'Password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  password: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(STRING_PASSWORD_CHARACTER, {
    message:
      'Password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  passwordConfirmation: string

  @IsOptional()
  @IsString()
  @IsPhoneNumber('ID')
  @ApiProperty({ example: '085123456789' })
  phoneNumber: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  otp: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string

  role: Role
  isVerified: boolean
}

export class UserUpdateRequest extends OmitType(UserRequest, [
  'email',
  'passwordConfirmation',
  'role',
  'otp',
  'isVerified',
  'token',
]) {}
