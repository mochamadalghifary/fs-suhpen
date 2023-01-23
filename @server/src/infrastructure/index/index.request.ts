import { ApiProperty } from '@nestjs/swagger'
import {
  OrderDirectionEnum,
  OrderDirectionType
} from '@server/src/infrastructure/index/index.enum'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { IPaginateRequest, ISortRequest } from './index.interface'

export class IndexRequest implements ISortRequest, IPaginateRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'updatedAt',
    description: 'Sort entity by column name',
  })
  sort?: string

  @IsOptional()
  @IsEnum(OrderDirectionEnum)
  @ApiProperty({
    example: OrderDirectionEnum.Desc,
    description: `${OrderDirectionEnum.Asc} || ${OrderDirectionEnum.Desc}`,
  })
  order?: OrderDirectionType

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 10, description: 'Number of entities in one page' })
  perPage?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1, description: 'The page where you are' })
  page?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '', description: 'Search all entity column value' })
  search?: string
}
