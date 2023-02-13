import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { IAppAttachment } from './attachment.interface'

@Entity()
export class AppAttachment extends BaseEntity implements IAppAttachment {
  @Column()
  fileUrl: string

  @Column()
  module: string
}
