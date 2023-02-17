import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EttAttachment } from './attachment.entity'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from './attachment.request'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(EttAttachment)
    private readonly attachmentRepo: Repository<EttAttachment>,
  ) {}

  async upload(
    fileUrl: string,
    req: AttachmentUploadRequest,
  ): Promise<EttAttachment> {
    const attachment = this.attachmentRepo.create({
      fileUrl,
      module: req.module,
    })

    return await this.attachmentRepo.save(attachment)
  }

  async findOne(req: AttachmentFindRequest): Promise<EttAttachment> {
    return await this.attachmentRepo.findOneOrFail({
      where: [{ fileUrl: req.fileUrl }, { module: req.module }],
    })
  }
}
