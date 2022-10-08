import {
	Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Exception } from 'src/common/exceptions/index.exception';
import { MailService } from '../../../support/mail/services/mail.service';
import { GetUserLogged } from '../../user/common/get-user.decorator';
import { AppUser } from '../../user/entities/user.entity';
import { IAppUser } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
import { UserChangePasswordRequest } from '../requests/user-change-password.request';
import { UserLoginRequest } from '../requests/user-login.request';
import { UserEmailOtpRequest } from '../requests/user-otp-email.request';
import { UserRegisterRequest } from '../requests/user-register.request';
import { AuthEmailService } from '../services/auth-email.service';
import { AuthWhatsAppService } from '../services/auth-whatsapp.service';

@Injectable()
export class AuthApp {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
		private readonly authWhatsAppService: AuthWhatsAppService,
		private readonly authEmailService: AuthEmailService,
	) {}

	async login(req: UserLoginRequest): Promise<IAppUser> {
		const { email, password } = req;
		const user = await this.userService.findOneByEmail(email);

		if (user && user.password && (await bcrypt.compare(password, user.password))) {
			const accessToken: string = this.jwtService.sign({ id: user.id });

			user.accessToken = accessToken;

			return user;

		} else Exception.unprocessableEntity('Email atau Password Anda salah')
	}

	async register(req: UserRegisterRequest): Promise<IAppUser> {
		const user = new AppUser();
		Object.assign(user, req);

		const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(req.password, salt);

		return await this.userService.create(user);
	}

	async changePassword(req: UserChangePasswordRequest): Promise<IAppUser> {
		const user = await this.userService.findOneByEmail(req.email);
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.password, salt);

		!user && Exception.unprocessableEntity('Email atau Nomor Telepon belum terdaftar')

		if (user.password) if (await bcrypt.compare(req.password, user.password)) {
			Exception.unprocessableEntity('Kata sandi telah digunakan sebelumnya')
		}

		user.password = hashedPassword;
		user.accessToken = null;

		await this.userService.update(user);
		await this.mailService.sendSuccessChangePassword(user);

		return user;
	}

	async otpEmailSend(req: UserEmailOtpRequest): Promise<number> {
		return await this.authEmailService.send(req);
	}

	async otpEmailVerify(req: UserEmailOtpRequest): Promise<IAppUser> {
		return await this.authEmailService.verify(req);
	}

	async otpWhatsAppSend(@GetUserLogged() user?: IAppUser): Promise<void> {
		await this.authWhatsAppService.send(user.phoneNumber);
	}

	async otpWhatsAppVerify(otp: number, @GetUserLogged() user?: IAppUser): Promise<IAppUser> {
		return await this.authWhatsAppService.verify(otp, user);
	}
}
