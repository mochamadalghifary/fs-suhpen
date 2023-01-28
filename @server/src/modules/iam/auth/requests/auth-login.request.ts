import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { UserRequest } from '../../user/requests/user.request'

export class AuthLoginRequest extends PickType(UserRequest, ['email']) {
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin123' })
  password!: string
}
