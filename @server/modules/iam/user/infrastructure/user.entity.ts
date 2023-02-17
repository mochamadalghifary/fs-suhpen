import { BaseEntity } from '@server/infrastructure/base/base.entity'
import * as bcrypt from 'bcrypt'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { ERole } from '../../role/infrastructure/role.enum'
import { IUser } from '../infrastructure/user.interface'

@Entity()
export class AppUser extends BaseEntity implements IUser {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: ERole, default: ERole.User })
  role: ERole

  @Column({ default: null })
  address?: string

  @Column({ default: null, unique: true })
  phoneNumber?: string

  @Column({ default: null, unique: true })
  avatar?: string

  @Column({ default: null })
  otp?: number

  @Column({ default: null })
  token?: string

  @Column({ default: false })
  isVerified: boolean

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
