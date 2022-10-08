import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const globalPrefix = config.app.prefix
  const publicPath = join(__dirname, '..', 'public');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(publicPath);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.app.name)
    .setDescription('The Inventory API description')
    .setVersion(config.app.version)
    .addTag(config.app.tag)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port: string = config.port;
  await app.listen(port);

  Logger.log(`Application running on port ${port}`, 'NestApplication');
}
bootstrap();
