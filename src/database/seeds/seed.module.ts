import { userSeeder } from './users/user.seeder';

export const seeders = async () => {
  await userSeeder()
}