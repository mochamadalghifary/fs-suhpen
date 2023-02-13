import { Injectable } from '@nestjs/common'
import { Exception } from '../../../../common/exceptions/index.exception'
import { ERole } from './role.enum'
import { IAppRole } from './role.interface'

const roles: IAppRole[] = [
  {
    id: '1',
    name: ERole.Administrator,
  },
  {
    id: '2',
    name: ERole.AdminSecond,
  },
  {
    id: '3',
    name: ERole.User,
  },
]

@Injectable()
export class RoleService {
  async find(): Promise<IAppRole[]> {
    return roles
  }

  async findOne(name: string): Promise<IAppRole | undefined> {
    const data = roles.find((role) => role.name == name)
    if (!data) Exception.entityNotFound('name', name)
    return data
  }
}
