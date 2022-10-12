import { IBaseEntity } from 'src/infrastructure/base/base-entity.interface'

export interface IAppAttachment extends IBaseEntity {
  fileUrl: string
  module: string
}
