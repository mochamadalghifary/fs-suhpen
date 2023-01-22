import { Exception } from '../../../../common/exceptions/index.exception'
import { Role } from '../enums/role.enum'
import { IAppRole } from '../interfaces/role.interface'

const roles: IAppRole[] = [
  {
    id: '1',
    name: Role.Administrator,
  },
  {
    id: '2',
    name: Role.AdminSecond,
  },
  {
    id: '3',
    name: Role.User,
  },
]

export class RoleApp {
  async find(): Promise<IAppRole[]> {
    return roles
  }

  async findOne(name: string): Promise<IAppRole | undefined> {
    const data = roles.find((role) => role.name == name)
    if (!data) Exception.entityNotFound('name', name)
    return data
  }
}
