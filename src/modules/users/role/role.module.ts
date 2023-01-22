import { Module } from '@nestjs/common'
import { RoleController } from './controllers/role.controller'
import { RoleService } from './service/role.service'

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
