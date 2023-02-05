import { Injectable } from '@nestjs/common'
import { sendMail } from '@server/src/modules/support/mail/mail.service'
import { MailTemplatePasswordResetLink } from '@server/src/modules/support/mail/password-reset-link.template'
import { MailTemplatePasswordResetSuccess } from '@server/src/modules/support/mail/password-reset-succes.template'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { IAppUser } from '../../user/interfaces/user.interface'

@Injectable()
export class AuthPasswordService {
  async passwordResetLink(user: IAppUser, link: string): Promise<boolean> {
    const mailOptions: MailOptions = {
      to: user.email,
      subject: `Password Reset ${user.name} Link`,
      html: MailTemplatePasswordResetLink(user, link),
    }

    sendMail(mailOptions)

    return true
  }

  async passwordResetSuccess(user: IAppUser): Promise<boolean> {
    const mailOptions: MailOptions = {
      to: user.email,
      subject: `Password Reset ${user.name} Success`,
      html: MailTemplatePasswordResetSuccess(user),
    }

    sendMail(mailOptions)

    return true
  }
}
