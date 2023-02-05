import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/src/infrastructure/index/index.request'
import { IsNotEmpty, IsString } from 'class-validator'

export class AttachmentFindRequest extends IndexRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileUrl: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  module: string
}
