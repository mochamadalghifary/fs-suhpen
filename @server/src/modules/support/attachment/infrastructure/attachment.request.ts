import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AttachmentUploadRequest {
  @IsNotEmpty({ message: 'Field wajib diisi' })
  @IsString()
  @ApiProperty()
  module: string
}

export class AttachmentFindRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileUrl: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  module: string
}
