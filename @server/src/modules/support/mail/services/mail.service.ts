import { Logger } from '@nestjs/common'
import { config } from '@server/src/config'
import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { Exception } from '../../../../common/exceptions/index.exception'

const emailFrom = 'fradotech.id@gmail.com'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: +config.smtp.port,
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
})

export const sendMail = (mailOptions: MailOptions) => {
  mailOptions.from = emailFrom
  transporter.sendMail(mailOptions, (error, info) => {
    error && Exception.unprocessable(error)
    // eslint-disable-next-line
    info && Logger.log('Success send mail to ' + info.accepted, 'Mail Service')
  })
}
