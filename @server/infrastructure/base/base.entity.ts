import { GetUserLogged } from '@server/modules/iam/user/common/get-user-logged.decorator'
import { AppUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => AppUser)
  createdBy: IUser

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => AppUser)
  updatedBy: IUser

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => AppUser)
  deletedBy: IUser

  @BeforeInsert()
  beforeInsert(@GetUserLogged() user: IUser): void {
    this.createdBy = user
  }

  @BeforeUpdate()
  beforeUpdate(@GetUserLogged() user: IUser): void {
    this.updatedBy = user
    this.updatedAt = new Date()
  }

  @BeforeSoftRemove()
  beforeSoftRemove(@GetUserLogged() user: IUser): void {
    this.deletedBy = user
  }
}
