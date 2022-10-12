import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { IndexRequest } from 'src/infrastructure/index/index.request'

export class FindAttachmentRequest extends IndexRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileUrl: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  module: string
}
