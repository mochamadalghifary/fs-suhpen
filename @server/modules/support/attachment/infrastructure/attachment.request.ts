import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

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

export class AttachmentUploadRequest extends PickType(AttachmentFindRequest, [
  'module',
]) {}
