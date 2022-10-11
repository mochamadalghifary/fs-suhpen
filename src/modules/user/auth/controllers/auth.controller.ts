import {
	Body,
	Controller, Get, Param, Post,
	Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IApiResponse } from 'src/infrastructure/interfaces/responses.interface';
import { Routes } from 'src/modules/routes';
import { UserResponse } from '../../user/responses/user.response';
import { AuthApp } from '../apps/auth.app';
import { AuthChangePasswordRequest } from '../requests/auth-change-password.request';
import { AuthEmailRequest } from '../requests/auth-email.request';
import { AuthLoginRequest } from '../requests/auth-login.request';
import { AuthRegisterRequest } from '../requests/auth-register.request';

@Controller(Routes.Auth)
@ApiTags(Routes.Auth)
export class AuthController {
	constructor(
		private readonly authApp: AuthApp,
	) {}

	@Post('login')
	async login(@Body() req: AuthLoginRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.login(req);

		return {
			message: `Login successfull`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Post('register')
	async register(@Body() req: AuthRegisterRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.register(req);

		return {
			message: `Register successfull`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Post('password/send')
	async passwordSendLinkChange(@Body() req: AuthEmailRequest): Promise<IApiResponse<any>> {
		const user = await this.authApp.passwordSendLink(req);

		return {
			message: `Berhasil kirim link reset password ke ${req.email}`,
			data: UserResponse.fromEntity(user),
		};
	}

	@Get('password/get/:token')
	async passwordGetLinkChange(@Param('token') token: string): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.passwordGetLink(token);

		return {
			message: 'Link validasi password',
			data: UserResponse.fromEntity(user),
		};
	}

	@Put('password/change')
	async passwordChange(@Body() req: AuthChangePasswordRequest): Promise<IApiResponse<UserResponse>> {
		const user = await this.authApp.passwordChange(req);

		return {
			message: 'Password berhasil diubah',
			data: UserResponse.fromEntity(user),
		};
	}

	// @Post('otp/email')
	// async sendOtpEmail(@Body() req: AuthEmailRequest): Promise<IApiResponse<any>> {
	// 	const sendOtpEmail = await this.authApp.otpEmailSend(req);

	// 	return {
	// 		message: `Berhasil kirim OTP melalui Email`,
	// 		data: {
	// 			otp_expiration_countdown: sendOtpEmail,
	// 		},
	// 	};
	// }

	// @Patch('otp/email')
	// async verifyEmailOtp(@Body() req: AuthEmailRequest): Promise<IApiResponse<UserResponse>> {
	// 	const user = await this.authApp.otpEmailVerify(req);

	// 	return {
	// 		message: `Berhasil verifikasi OTP`,
	// 		data: UserResponse.fromEntity(user),
	// 	};
	// }

	// @Post('otp/whatsapp')
	// @UseGuards(AuthGuard('jwt'))
	// async sendOtpByWhatsApp(): Promise<IApiResponse<any>> {
	// 	await this.authApp.otpWhatsAppSend();

	// 	return {
	// 		message: `Berhasil kirim OTP melalui WhatsApp`,
	// 		data: null,
	// 	};
	// }

	// @Patch('otp/whatsapp')
	// async verifySmsWaOtp(
	// 	@Body() req: AuthOtpRequest,
	// ): Promise<IApiResponse<UserResponse>> {
	// 	const member = await this.authApp.otpWhatsAppVerify(req.otp);

	// 	return {
	// 		message: `Berhasil verifikasi OTP`,
	// 		data: UserResponse.fromEntity(member),
	// 	};
	// }
}
