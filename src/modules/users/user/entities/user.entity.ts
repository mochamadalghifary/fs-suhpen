import * as bcrypt from 'bcrypt'
import { BaseEntity } from 'src/infrastructure/base/base.entity'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { IAppUser } from '../interfaces/user.interface'
import { Role } from './../../role/enums/role.enum'

@Entity()
export class AppUser extends BaseEntity implements IAppUser {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role

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
