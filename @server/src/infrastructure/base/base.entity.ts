import { GetUserLogged } from '@server/src/modules/iam/user/common/get-user.decorator'
import { AppUser } from '@server/src/modules/iam/user/entities/user.entity'
import { IAppUser } from '@server/src/modules/iam/user/interfaces/user.interface'
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => AppUser)
  createdBy: IAppUser

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => AppUser)
  updatedBy: IAppUser

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => AppUser)
  deletedBy: IAppUser

  @BeforeInsert()
  beforeInsert(@GetUserLogged() user: IAppUser): void {
    this.createdBy = user
  }

  @BeforeUpdate()
  beforeUpdate(@GetUserLogged() user: IAppUser): void {
    this.updatedBy = user
    this.updatedAt = new Date()
  }

  @BeforeSoftRemove()
  beforeSoftRemove(@GetUserLogged() user: IAppUser): void {
    this.deletedBy = user
  }
}
