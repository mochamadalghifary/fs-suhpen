import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './app.module'
import { config } from './config'
import { swaggerConfig } from './infrastructure/swagger/swagger.config'

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const globalPrefix = config.app.prefix
  const publicPath = join(__dirname, '..', 'public')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(publicPath)
  app.setGlobalPrefix(globalPrefix)
  app.enableCors()

  // await seeders()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  const port = config.server.port
  await app.listen(port)

  Logger.log(`Application running at http://localhost:${port}`, 'NestApplication')
}
bootstrap()
