import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { config } from 'src/config'
import { Exception } from '../../../../common/exceptions/index.exception'
import { IAppUser } from '../../../users/user/interfaces/user.interface'
import { MailTemplatePasswordResetLink } from '../templates/password-reset-link.template'
import { MailTemplatePasswordResetSuccess } from '../templates/password-reset-succes.template'

const emailFrom = 'fradotech.id@gmail.com'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: +config.smtp.port,
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
})

const sendMail = (mailOptions: MailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    error && Exception.unprocessable(error)
    // eslint-disable-next-line
    info && console.info('info - Success send email', info)
  })
}

export const MailService = {
  passwordResetLink: async (user: IAppUser, link: string): Promise<boolean> => {
    const mailOptions: MailOptions = {
      from: emailFrom,
      to: user.email,
      subject: `Password Reset ${user.name} Link`,
      html: MailTemplatePasswordResetLink(user, link),
    }

    sendMail(mailOptions)

    return true
  },

  passwordResetSuccess: async (user: IAppUser): Promise<boolean> => {
    const mailOptions: MailOptions = {
      from: emailFrom,
      to: user.email,
      subject: `Password Reset ${user.name} Success`,
      html: MailTemplatePasswordResetSuccess(user),
    }

    sendMail(mailOptions)

    return true
  },
}
