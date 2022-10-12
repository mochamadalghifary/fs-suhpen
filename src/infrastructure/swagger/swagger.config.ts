import { DocumentBuilder } from '@nestjs/swagger'
import { config } from 'src/config'

export const swaggerConfig = new DocumentBuilder()
  .setTitle(config.app.name)
  .setDescription(config.app.description)
  .setVersion(config.app.version)
  .addBearerAuth()
  .setExternalDoc('Download Collection', '/docs-json')
  .build()
