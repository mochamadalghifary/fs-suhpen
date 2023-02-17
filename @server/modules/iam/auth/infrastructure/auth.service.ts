import { Injectable } from '@nestjs/common'
import { sendMail } from '@server/modules/support/mail/mail.service'
import { MailTemplatePasswordResetLink } from '@server/modules/support/mail/password-reset-link.template'
import { MailTemplatePasswordResetSuccess } from '@server/modules/support/mail/password-reset-succes.template'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { IUser } from '../../user/infrastructure/user.interface'

@Injectable()
export class AuthService {
  async passwordResetLink(user: IUser, link: string): Promise<boolean> {
    const mailOptions: MailOptions = {
      to: user.email,
      subject: `Password Reset ${user.name} Link`,
      html: MailTemplatePasswordResetLink(user, link),
    }

    sendMail(mailOptions)

    return true
  }

  async passwordResetSuccess(user: IUser): Promise<boolean> {
    const mailOptions: MailOptions = {
      to: user.email,
      subject: `Password Reset ${user.name} Success`,
      html: MailTemplatePasswordResetSuccess(user),
    }

    sendMail(mailOptions)

    return true
  }
}
