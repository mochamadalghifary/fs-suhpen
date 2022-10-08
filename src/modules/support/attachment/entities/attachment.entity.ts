import { AppBaseEntity } from 'src/databases/base.entity';
import {
	Column,
	Entity
} from 'typeorm';
import { IAppAttachment } from '../interfaces/attachment.interface';

@Entity()
export class AppAttachment extends AppBaseEntity implements IAppAttachment {
	@Column()
	attachment: string;

	@Column()
	module: string;
}
