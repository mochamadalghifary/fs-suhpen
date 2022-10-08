import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EntityNotFoundExceptionFilter, HttpExceptionFilter } from './common/filters/http-exeception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { DatabaseModule } from './databases/databases.module';
import { FeatureModule } from './modules/feature/feature.module';
import { SupportModule } from './modules/support/support.module';
import { AuthModule } from './modules/user/auth/auth.module';
import { RoleModule } from './modules/user/role/role.module';
import { UserModule } from './modules/user/user/user.module';

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
      useClass: HttpExceptionFilter
    }, {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter
    }, {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
  ],
})
export class AppModule {}
