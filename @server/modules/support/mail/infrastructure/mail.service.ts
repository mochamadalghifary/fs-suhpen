import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface'
import { Logger } from '@nestjs/common'
import { config } from '@server/config'
import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { Exception } from '../../../../common/exceptions/index.exception'

export class MailService {
  constructor(private readonly transporter: TransportType) {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: +config.smtp.port,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password,
      },
    })
  }

  async send(mailOptions: MailOptions) {
    mailOptions.from = 'fradotech.id@gmail.com'
    this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
      error && Exception.unprocessable(error)
      info &&
        Logger.log('Success send mail to ' + info.accepted, 'Mail Service')
    })
  }
}
