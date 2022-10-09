import { BaseEntity } from 'src/infrastructure/base/base.entity';
import {
	Column,
	Entity
} from 'typeorm';
import { IAppAttachment } from '../interfaces/attachment.interface';

@Entity()
export class AppAttachment extends BaseEntity implements IAppAttachment {
	@Column()
	attachment: string;

	@Column()
	module: string;
}
