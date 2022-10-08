import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { Exception } from 'src/common/exceptions/index.exception';
import { MailService } from '../../../support/mail/services/mail.service';
import { IAppUser } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
import { UserEmailRequest } from '../requests/user-email.request';
import { UserEmailOtpRequest } from '../requests/user-otp-email.request';

@Injectable()
export class AuthEmailService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async sendOtp(req: UserEmailRequest): Promise<number> {
        const user = await this.userService.findOneByEmail(req.email);

        if (!user) Exception.unprocessableEntity('Email tidak terdaftar')

        const otp: number = Math.floor(100000 + Math.random() * 900000);
        const otpExpiredAt = moment().add(+process.env.OTP_TIMEOUT_IN_MINUTES, 'minutes');
        const countDown = moment.duration(otpExpiredAt.diff(moment())).asMilliseconds();

        user.otp = otp;
        user.otpExpiredAt = otpExpiredAt.toDate();
        await this.userService.update(user);

        await this.mailService.sendOtp(user, otp);

        return countDown;
    }

    async verify(
        req: UserEmailOtpRequest,
    ): Promise<IAppUser> {
        const user = await this.userService.findOneByEmail(req.email);

        if (!user) Exception.unprocessableEntity('Email tidak terdaftar')
        if (user.otp != req.otp) Exception.unprocessableEntity('OTP salah')
        if (user.email != req.email) throw Exception.unprocessableEntity('Email salah')
        if (moment().diff(user.otpExpiredAt, 'seconds') > 0) Exception.unprocessableEntity('OTP sudah kadaluarsa')

        user.otp = null;
        user.otpExpiredAt = null;
        user.isVerified = true;

        await this.userService.update(user);

        user._accessToken = await this.jwtService.signAsync({ id: user.id });
        return user;
    }
}
