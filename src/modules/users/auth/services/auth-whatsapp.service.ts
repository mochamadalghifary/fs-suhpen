import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import moment from 'moment'
import { Exception } from 'src/common/exceptions/index.exception'
import { IAppUser } from '../../user/interfaces/user.interface'
import { UserService } from '../../user/services/user.service'

@Injectable()
export class AuthWhatsAppService {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async send(phoneNumber: string): Promise<void> {
    const user = await this.userService.findOneByPhoneNumber(phoneNumber)
    const otp: number = Math.floor(Math.random() * 1000000)

    user.otp = otp
    user.otpExpiredAt = moment()
      .add(+process.env.OTP_TIMEOUT_IN_MINUTES, 'minutes')
      .toDate()

    await this.userService.update(user)
    await this.httpService.axiosRef
      .post(
        process.env.NUSASMS_HOST + 'nusasms_api/1.0/whatsapp/message',
        {
          destination: phoneNumber,
          message: `Kode Verifikasi : ${otp} JANGAN BERIKAN KODE RAHASIA INI KEPADA SIAPA PUN, Kode ini berlaku selama 10 menit`,
        },
        {
          headers: {
            Accept: 'application/json',
            APIKey: process.env.NUSASMS_API_KEY,
          },
        },
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  async verify(otp: number, user: IAppUser): Promise<IAppUser> {
    if (!user) Exception.unprocessableEntity('Email tidak terdaftar')
    if (user.otp != otp) Exception.unprocessableEntity('OTP salah')
    if (moment().diff(user.otpExpiredAt, 'seconds') > 0)
      Exception.unprocessableEntity('OTP sudah kadaluarsa')

    user.otp = null
    user.otpExpiredAt = null
    user.isVerified = true

    await this.userService.update(user)

    user.token = await this.jwtService.signAsync({ id: user.id })
    return user
  }
}
