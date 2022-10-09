import { IsNotEmpty, IsString } from 'class-validator';
import { IndexRequest } from 'src/infrastructure/index/index.request';

export class FindAttachmentRequest extends IndexRequest {
	@IsNotEmpty()
	@IsString()
	attachmentName: string;

	@IsNotEmpty()
	@IsString()
	module: string;
}
