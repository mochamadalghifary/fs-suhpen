import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserCrudApp } from './apps/user-crud.app'
import { UserCrudController } from './controllers/user-crud.controller'
import { UserProfileController } from './controllers/user-profile.controller'
import { AppUser } from './entities/user.entity'
import { UserIndexService } from './services/user-index.service'
import { UserService } from './services/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([AppUser]), AuthModule, HttpModule],
  controllers: [UserCrudController, UserProfileController],
  providers: [UserService, UserCrudApp, UserIndexService],
  exports: [UserService],
})
export class UserModule {}
