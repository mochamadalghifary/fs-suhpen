import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'

export interface IAttachment extends IBaseEntity {
  fileUrl: string
  module: string
}
