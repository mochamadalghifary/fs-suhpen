import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserIndexApp } from './infrastructure/user-index.app'
import { AppUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserCrudApp } from './v1/user-crud.app'
import { UserCrudController } from './v1/user-crud.controller'
import { UserProfileController } from './v1/user-profile.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppUser]), AuthModule, HttpModule],
  controllers: [UserCrudController, UserProfileController],
  providers: [UserService, UserCrudApp, UserIndexApp],
  exports: [UserService],
})
export class UserModule {}
