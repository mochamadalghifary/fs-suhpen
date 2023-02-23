import { ERole } from '../../../modules/iam/role/infrastructure/role.enum'

// <--- KEY: email --->
export const usersDummies = [
  {
    name: 'Admin',
    email: 'Admin@suhpen.com',
    password: '$2b$10$eO7f13Ettz4rcp39kECXOeQSQ.IkIta9x0eNK8kJcliSeaj5RtIwi', // Admin123
    role: ERole.Administrator,
  },
]
