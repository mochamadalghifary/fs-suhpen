import { DocumentBuilder } from '@nestjs/swagger'
import { config } from '@server/config'

export const swaggerConfig = new DocumentBuilder()
  .setTitle(config.app.name)
  .setDescription(config.app.description)
  .setVersion(config.app.version)
  .setExternalDoc('Download Collection', '/docs-json')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    '_accessToken',
  )
  .build()
