import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'src/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: +config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: config.nodeEnv === 'local',
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
