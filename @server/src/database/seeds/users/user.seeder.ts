import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '@server/src/database/config.db'
import { EntityManager, Repository } from 'typeorm'
import { AppUser } from '../../../modules/iam/user/entities/user.entity'
import { IAppUser } from '../../../modules/iam/user/interfaces/user.interface'
import { usersDummies } from './user.dummy'

export const userSeeder = async (): Promise<boolean> => {
  const data = usersDummies
  const repo = new Repository<IAppUser>(
    AppUser,
    new EntityManager(DataSourceOptions),
  )
  const table = AppUser.name

  const userExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.email = :email`, { email: data[0].email })
    .getOne()

  if (userExist) return false

  await repo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(
    'Success run users seeders ',
    data.map((data) => data.email).toString(),
  )

  return true
}
