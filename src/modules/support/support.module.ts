import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [MailModule, AttachmentModule],
  controllers: [],
  providers: [],
})
export class SupportModule {}
