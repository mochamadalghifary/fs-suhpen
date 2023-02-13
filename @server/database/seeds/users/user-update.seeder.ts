import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '@server/database/config.db'
import { AppUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntityManager, Repository } from 'typeorm'
import { UserCreateRequest } from '../../../modules/iam/user/infrastructure/user.request'
import { usersDummies } from './user.dummy'

export const userUpdateSeeder = async (): Promise<boolean> => {
  const data = usersDummies
  const repo = new Repository<IAppUser>(
    AppUser,
    new EntityManager(DataSourceOptions),
  )

  data.forEach(async (data) => {
    const dataExist = await repo.findOne({ where: { email: data.email } })
    const dataCreate = new UserCreateRequest()
    Object.assign(dataCreate, data)

    dataExist && (dataCreate.id = dataExist.id)
    await repo.save(dataCreate)
  })

  Logger.log(
    'Success run users seeders ',
    data.map((data) => data.email).toString(),
  )

  return true
}
