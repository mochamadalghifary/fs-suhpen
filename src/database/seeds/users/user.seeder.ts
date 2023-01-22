import { EntityManager, Repository } from 'typeorm';
import logger from '../../../common/utils/logger';
import { AppUser } from '../../../modules/users/user/entities/user.entity';
import { IAppUser } from '../../../modules/users/user/interfaces/user.interface';
import { DataSourceOptions } from '../../config/options.db';
import { usersDummies } from "./user.dummy";

export const userSeeder = async (): Promise<boolean> => {
  const data = usersDummies
  const repo = new Repository<IAppUser>(AppUser, new EntityManager(DataSourceOptions))
  const table = AppUser.name

  const userExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.email = :email`, { email: data[0].email })
    .getOne()

  if (userExist) return false

  await repo
    .createQueryBuilder(table)
    .insert()
    .values(data)
    .execute()

  logger('Seeder', 'Success run users seeders ', data.map((data) => data.email).toString())

  return true
}