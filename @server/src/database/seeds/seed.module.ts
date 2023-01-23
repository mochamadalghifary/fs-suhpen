import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '../config.db'
import { userSeeder } from './users/user.seeder'

export const seeders = async () => {
  await DataSourceOptions.initialize()
    .then(async () => Logger.log('Success connect seeder', 'Seeder'))
    .catch((error) => Logger.error(error))

  await userSeeder()
}
