import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'

export interface IBaseEntity {
  id: string
  createdAt?: Date
  createdBy?: IUser
  updatedAt?: Date
  updatedBy?: IUser
  deletedAt?: Date
  deletedBy?: IUser
}
