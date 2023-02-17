import { AppAttachment } from './attachment.entity'
import { IAttachment } from './attachment.interface'

export class AttachmentUploadResponse extends AppAttachment {
  static fromEntity(data: IAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), data)
  }
}
