import { Role } from 'src/common/enums/role.enum';
import { AppBaseEntity } from 'src/infrastructure/databases/entities/base.entity';
import {
	Column,
	Entity
} from 'typeorm';
import { IAppRole } from '../../role/interfaces/role.interface';
import { IAppUser } from '../interfaces/user.interface';

@Entity()
export class AppUser extends AppBaseEntity implements IAppUser {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'varchar', default: Role.AdminEmployee })
	role: IAppRole;

	@Column({ default: null })
	address: string;

	@Column({ default: null, unique: true })
	phoneNumber: string;

	@Column({ default: null })
	otp: number

	@Column({ default: false })
	isVerified: boolean
}
