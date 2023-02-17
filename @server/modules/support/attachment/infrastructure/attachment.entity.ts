import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { IAttachment } from './attachment.interface'

@Entity()
export class AppAttachment extends BaseEntity implements IAttachment {
  @Column()
  fileUrl: string

  @Column()
  module: string
}
