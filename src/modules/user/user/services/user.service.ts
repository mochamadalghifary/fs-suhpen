import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/module/base.service';
import { DeleteResult, Repository } from 'typeorm';
import { AppUser } from '../entities/user.entity';
import { IAppUser } from '../interfaces/user.interface';

@Injectable()
export class UserService implements BaseService {
	constructor(
		@InjectRepository(AppUser)
		private readonly userRepo: Repository<IAppUser>,
	) {}

	async create(req: IAppUser): Promise<IAppUser> {
		const data = this.userRepo.create(req);
		return await this.userRepo.save(data);
	}

	async find(): Promise<IAppUser[]> {
		return await this.userRepo.find()
	}

	async findOne(id: string): Promise<IAppUser> {
		return await this.userRepo.findOne({ where: { id } });
	}

	async findOneOrFail(id: string): Promise<IAppUser> {
		return await this.userRepo.findOneOrFail({ where: { id } });
	}

	async update(req: IAppUser): Promise<IAppUser> {
		const data = this.userRepo.create(req);
		await this.userRepo.update(data.id, data);
		return this.findOneOrFail(req.id)
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.userRepo.delete({ id });
	}

	async softDelete(id: string): Promise<DeleteResult> {
		return await this.userRepo.softDelete({ id });
	}

	public async findOneByEmail(email: string): Promise<IAppUser> {
		return await this.userRepo.findOneOrFail({ where: { email } });
	}

	public async findOneByPhoneNumber(phoneNumber: string): Promise<IAppUser> {
		return await this.userRepo.findOneOrFail({ where: { phoneNumber } });
	}
}
