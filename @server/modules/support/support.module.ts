import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [AttachmentModule, MailModule],
  controllers: [],
  providers: [],
})
export class SupportModule {}
