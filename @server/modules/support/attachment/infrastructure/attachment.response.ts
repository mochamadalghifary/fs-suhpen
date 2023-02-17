import { EttAttachment } from './attachment.entity'
import { IAttachment } from './attachment.interface'

export class AttachmentUploadResponse extends EttAttachment {
  static fromEntity(data: IAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), data)
  }
}
