import { IAppAttachment } from '../interfaces/attachment.interface'

export class AttachmentUploadResponse implements IAppAttachment {
  id: string
  fileUrl: string
  module: string

  static fromEntity(attachment: IAppAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), attachment)
  }
}
