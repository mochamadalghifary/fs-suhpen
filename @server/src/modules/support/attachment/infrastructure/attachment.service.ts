import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppAttachment } from './attachment.entity'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from './attachment.request'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(AppAttachment)
    private readonly attachmentRepo: Repository<AppAttachment>,
  ) {}

  async upload(
    fileUrl: string,
    req: AttachmentUploadRequest,
  ): Promise<AppAttachment> {
    const attachment = this.attachmentRepo.create({
      fileUrl,
      module: req.module,
    })

    return await this.attachmentRepo.save(attachment)
  }

  async findOne(req: AttachmentFindRequest): Promise<AppAttachment> {
    return await this.attachmentRepo.findOneOrFail({
      where: [{ fileUrl: req.fileUrl }, { module: req.module }],
    })
  }
}
