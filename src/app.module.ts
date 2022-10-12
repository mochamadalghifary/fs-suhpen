import { Module } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import {
  EntityNotFoundExceptionFilter,
  HttpExceptionFilter,
  QueryErrorFilter,
  RelationNotFoundExceptionFilter,
} from './common/filters/http-exeception.filter'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { DatabaseModule } from './database/database.module'
import { FeatureModule } from './modules/feature/feature.module'
import { SupportModule } from './modules/support/support.module'
import { AuthModule } from './modules/users/auth/auth.module'
import { RoleModule } from './modules/users/role/role.module'
import { UserModule } from './modules/users/user/user.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    RoleModule,
    SupportModule,
    FeatureModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RelationNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
