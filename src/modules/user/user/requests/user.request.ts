import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
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
    @ApiProperty({ example: 'Frado' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'frado001@gmail.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(STRING_PASSWORD_CHARACTER, {
        message: 'Password should contain number, under case, and upper case character',
    })
    @ApiProperty({ example: 'Frado123' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(STRING_PASSWORD_CHARACTER, {
        message: 'Password should contain number, under case, and upper case character',
    })
    @ApiProperty({ example: 'Frado123' })
    passwordConfirmation: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('ID')
    @ApiProperty({ example: '085123456789' })
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    avatar: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    otp: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    token: string;

    role: IAppRole
    isVerified: boolean
}
