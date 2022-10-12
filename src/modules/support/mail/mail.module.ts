import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from '../../../config'
import { MailProcessor } from './processor/mail.processor'
import { MailService } from './services/mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: +configService.get('MAIL_PORT'),
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get('APP_NAME'),
        },
        template: {
          // TODO: Sementara OK taruh di `public`, next time mohon pindahkan ke tempat yang lebih aman dan gak bs di akses public.
          dir: process.cwd() + '/public/assets/mail-templates',
          adapter: new HandlebarsAdapter(),
        },
        options: {
          strict: true,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({
      name: config.mailQueueName,
    }),
  ],
  controllers: [],
  providers: [MailProcessor, MailService],
  exports: [MailService],
})
export class MailModule {}
