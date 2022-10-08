import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { AppBaseEntity } from 'src/databases/base.entity';
import {
	BeforeInsert,
	BeforeUpdate,
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

	@Column({ type: 'enum', enum: Role, default: Role.AdminEmployee })
	role: IAppRole;

	@Column({ default: null })
	address: string;

	@Column({ default: null, unique: true })
	phoneNumber: string;

	@Column({ default: null, unique: true })
	avatar: string;

	@Column({ default: null })
	otp: number

	@Column({ default: null })
	_accessToken?: string;

	@Column({ default: false })
	isVerified: boolean

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
