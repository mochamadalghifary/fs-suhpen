import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AttachmentUploadRequest {
  @IsNotEmpty({ message: 'Field wajib diisi' })
  @IsString()
  @ApiProperty()
  module: string
}
