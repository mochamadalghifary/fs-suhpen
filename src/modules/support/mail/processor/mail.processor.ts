import { MailerService } from '@nestjs-modules/mailer';
import {
    OnQueueActive,
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { config } from 'src/config';
import { IAppUser } from 'src/modules/user/user/interfaces/user.interface';

@Processor(config.mailQueueName)
export class MailProcessor {
    private readonly logger = new Logger('MailProcessor');

    constructor(private readonly mailerService: MailerService) {}

    @OnQueueActive()
    onActive(job: Job): void {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: string): void {
        this.logger.debug(
            `Completed job ${job.id} of type ${job.name
            }. Result: ${JSON.stringify(result)}`,
        );
    }

    @OnQueueFailed()
    onError(job: Job<any>, error: Error): void {
        this.logger.error(
            `Failed job ${job.id} of type ${job.name}: ${error.message}`,
            error.stack,
        );
    }

    @Process('send-registered-user-email')
    async sendOtpEmail(
        job: Job<{ user: IAppUser; otp: number }>,
    ): Promise<any> {
        this.logger.log(
            `Sending confirmation email to '${job.data.user.email}'`,
        );

        try {
            const result = await this.mailerService.sendMail({
                template: 'send-otp',
                context: {
                    user: job.data.user,
                    otp: job.data.otp,
                },
                subject: `OTP `,
                to: job.data.user.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.user.email}'`,
                error.stack,
            );

            throw error;
        }
    }


    @Process('send-link-change-password')
    async sendLinkChangePassword(
        job: Job<{ user: IAppUser; link: string }>,
    ): Promise<any> {
        this.logger.log(
            `Sending link reset password information to '${job.data.user.email}'`,
        );

        try {
            const result = await this.mailerService.sendMail({
                template: 'link-reset-password',
                context: {
                    user: job.data.user,
                    link: job.data.link
                },
                subject: `Link Reset Password `,
                to: job.data.user.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.user.email}'`,
                error.stack,
            );

            throw error;
        }
    }

    @Process('send-success-change-password')
    async sendSuccessChangePassword(
        job: Job<{ user: IAppUser }>,
    ): Promise<any> {
        this.logger.log(
            `Sending change password information to '${job.data.user.email}'`,
        );

        try {
            const result = await this.mailerService.sendMail({
                template: 'reset-password-complete',
                context: {
                    user: job.data.user,
                },
                subject: `Berhasil Ubah Password `,
                to: job.data.user.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.user.email}'`,
                error.stack,
            );

            throw error;
        }
    }

    @Process('send-otp-update-email')
    async sendOtpUpdateEmail(
        job: Job<{ user: IAppUser; otp: number; email: string }>,
    ): Promise<any> {
        this.logger.log(`Sending confirmation email to '${job.data.email}'`);

        try {
            const result = await this.mailerService.sendMail({
                template: 'send-otp',
                context: {
                    user: job.data.user,
                    otp: job.data.otp,
                    email: job.data.email,
                },
                subject: `OTP `,
                to: job.data.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.user.email}'`,
                error.stack,
            );

            throw error;
        }
    }
}
