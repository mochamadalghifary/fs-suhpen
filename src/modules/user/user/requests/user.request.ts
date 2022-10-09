import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPhoneNumber,
    IsString,
    Matches,
    MinLength
} from 'class-validator';
import { IAppRole } from '../../role/interfaces/role.interface';
import { STRING_PASSWORD_CHARACTER } from '../common/character.constant';
import { IAppUser } from '../interfaces/user.interface';

export class UserRequest implements IAppUser {
    id: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z ]+$/)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(STRING_PASSWORD_CHARACTER, {
        message: 'Password should contain number, under case, and upper case character',
    })
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('ID')
    @ApiProperty()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    avatar: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    otp: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accessToken: string;

    role: IAppRole
    isVerified: boolean
}
