import { IndexRequest } from 'src/common/requests/index.request';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindAttachmentRequest extends IndexRequest {
	@IsNotEmpty()
	@IsString()
	attachmentName: string;

	@IsNotEmpty()
	@IsString()
	module: string;
}
