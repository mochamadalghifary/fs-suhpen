import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { config } from 'src/config';
import { IAppUser } from 'src/modules/user/user/interfaces/user.interface';

@Injectable()
export class MailService {
    private logger = new Logger('MailService');

    constructor(
        @InjectQueue(config.mailQueueName)
        private readonly mailQueue: Queue,
    ) {}

    async sendOTPConfirmationEmail(
        member: IAppUser,
        otp: number,
    ): Promise<boolean> {
        try {
            await this.mailQueue.add('send-registered-user-email', {
                member,
                otp,
            });

            this.logger.log(
                `Added email "${member.email}" to send-otp-confirmation-email queue`,
            );

            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    async sendSuccessChangePassword(member: IAppUser): Promise<boolean> {
        try {
            await this.mailQueue.add('send-success-change-password', {
                member,
            });

            this.logger.log(
                `Added email "${member.email}" to send-success-change-password queue`,
            );

            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    async sendOTPUpdateEmailMember(
        member: IAppUser,
        otp: number,
        email?: string,
    ): Promise<boolean> {
        try {
            await this.mailQueue.add('send-otp-update-email', {
                member,
                otp,
                email,
            });

            this.logger.log(
                `Added email "${email}" to send-otp-update-email queue`,
            );

            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
}
