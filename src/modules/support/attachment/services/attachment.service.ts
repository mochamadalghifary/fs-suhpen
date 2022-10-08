import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppAttachment } from '../entities/attachment.entity';
import { AttachmentUploadRequest } from '../requests/attachment-upload.request';
import { FindAttachmentRequest } from '../requests/find-attachment.request';

@Injectable()
export class AttachmentService {
    constructor(
        @InjectRepository(AppAttachment)
        private readonly attachmentRepository: Repository<AppAttachment>,
    ) {}

    async upload(
        fileUrl: string,
        request: AttachmentUploadRequest,
    ): Promise<AppAttachment> {
        const attachment = this.attachmentRepository.create({
            attachment: fileUrl,
            module: request.module,
        });

        return await this.attachmentRepository.save(attachment);
    }

    async findOne(
        request: FindAttachmentRequest,
    ): Promise<AppAttachment> {
        return await this.attachmentRepository.findOneOrFail({
            where: [
                { attachment: request.attachmentName },
                { module: request.module },
            ],
        });
    }
}
