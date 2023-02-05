import { Module } from '@nestjs/common'
import { RoleService } from './infrastructure/role.service'
import { RoleController } from './v1/role.controller'

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
