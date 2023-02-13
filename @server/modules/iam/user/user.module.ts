import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserCrudApp } from './infrastructure/user-crud.app'
import { UserIndexService } from './infrastructure/user-index.service'
import { AppUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserCrudController } from './v1/user-crud.controller'
import { UserProfileController } from './v1/user-profile.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppUser]), AuthModule, HttpModule],
  controllers: [UserCrudController, UserProfileController],
  providers: [UserService, UserCrudApp, UserIndexService],
  exports: [UserService],
})
export class UserModule {}
