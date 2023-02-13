import { AppAttachment } from './attachment.entity'
import { IAppAttachment } from './attachment.interface'

export class AttachmentUploadResponse extends AppAttachment {
  static fromEntity(data: IAppAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), data)
  }
}
