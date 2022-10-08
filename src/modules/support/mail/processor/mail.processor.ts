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
        job: Job<{ member: IAppUser; otp: number }>,
    ): Promise<any> {
        this.logger.log(
            `Sending confirmation email to '${job.data.member.email}'`,
        );

        try {
            const result = await this.mailerService.sendMail({
                template: 'send-otp',
                context: {
                    member: job.data.member,
                    otp: job.data.otp,
                },
                subject: `OTP Kalla Friends`,
                to: job.data.member.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.member.email}'`,
                error.stack,
            );

            throw error;
        }
    }

    @Process('send-success-change-password')
    async sendSuccessChangePassword(
        job: Job<{ member: IAppUser }>,
    ): Promise<any> {
        this.logger.log(
            `Sending change password information to '${job.data.member.email}'`,
        );

        try {
            const result = await this.mailerService.sendMail({
                template: 'reset-password-complete',
                context: {
                    member: job.data.member,
                },
                subject: `Berhasil Ubah Password Kalla Friends`,
                to: job.data.member.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.member.email}'`,
                error.stack,
            );

            throw error;
        }
    }

    @Process('send-otp-update-email')
    async sendOtpUpdateEmail(
        job: Job<{ member: IAppUser; otp: number; email: string }>,
    ): Promise<any> {
        this.logger.log(`Sending confirmation email to '${job.data.email}'`);

        try {
            const result = await this.mailerService.sendMail({
                template: 'send-otp',
                context: {
                    member: job.data.member,
                    otp: job.data.otp,
                    email: job.data.email,
                },
                subject: `OTP Kalla Friends`,
                to: job.data.email,
            });

            return result;
        } catch (error) {
            this.logger.error(
                `Failed to send email to '${job.data.member.email}'`,
                error.stack,
            );

            throw error;
        }
    }
}
