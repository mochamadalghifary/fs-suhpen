import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserTokenRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'access_token' })
	accessToken: string;
}
