import { IsNotEmpty, IsString } from 'class-validator';

export class AttachmentUploadRequest {
	@IsNotEmpty({ message: 'Field wajib diisi' })
	@IsString()
	module: string;
}
