import {
	Body,
	Controller, Patch, Post,
	Put,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { Routes } from 'src/modules/routes';
import { UserResponse } from '../../user/responses/user.response';
import { AuthApp } from '../apps/auth.app';
import { UserChangePasswordRequest } from '../requests/user-change-password.request';
import { UserLoginRequest } from '../requests/user-login.request';
import { UserEmailOtpRequest } from '../requests/user-otp-email.request';
import { UserOtpRequest } from '../requests/user-otp-phone-number.request';
import { UserRegisterRequest } from '../requests/user-register.request';

@Controller(Routes.Auth)
@ApiTags(Routes.Auth)
export class AuthController {
	constructor(
		private readonly authApp: AuthApp,
	) {}

	@Post('login')
	async login(@Body() req: UserLoginRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.login(req);

		return {
			message: `Login successfull`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Post('register')
	async register(@Body() req: UserRegisterRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.register(req);

		return {
			message: `Register successfull`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Post('otp/email')
	async sendOtpEmail(@Body() req: UserEmailOtpRequest): Promise<IApiResponse<any>> {
		const sendOtpEmail = await this.authApp.otpEmailSend(
			req,
		);

		return {
			message: `Berhasil kirim OTP melalui Email`,
			data: {
				otp_expiration_countdown: sendOtpEmail,
			},
		};
	}

	@Patch('otp/email')
	async verifyEmailOtp(@Body() req: UserEmailOtpRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.otpEmailVerify(req);

		return {
			message: `Berhasil verifikasi OTP`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Post('otp/whatsapp')
	@UseGuards(AuthGuard('jwt'))
	async sendOtpByWhatsApp(): Promise<IApiResponse<any>> {
		await this.authApp.otpWhatsAppSend();

		return {
			message: `Berhasil kirim OTP melalui WhatsApp`,
			data: null,
		};
	}

	@Patch('otp/whatsapp')
	async verifySmsWaOtp(
		@Body() req: UserOtpRequest,
	): Promise<IApiResponse<UserResponse>> {
		const member = await this.authApp.otpWhatsAppVerify(req.otp);

		return {
			message: `Berhasil verifikasi OTP`,
			data: UserResponse.fromEntity(member),
		};
	}

	@Put('password/change')
	async passwordChange(@Body() req: UserChangePasswordRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.passwordChange(req);

		return {
			message: 'Password berhasil diubah',
			data: UserResponse.fromEntity(user),
		};
	}
}
