import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/src/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { AppUser } from '../entities/user.entity'
import { IAppUser } from '../interfaces/user.interface'

@Injectable()
export class UserService implements BaseService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepo: Repository<IAppUser>,
  ) {}

  async create(req: IAppUser): Promise<IAppUser> {
    const data = this.userRepo.create(req)
    return await this.userRepo.save(data)
  }

  async find(): Promise<IAppUser[]> {
    return await this.userRepo.find()
  }

  async findOne(id: string): Promise<IAppUser> {
    return await this.userRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IAppUser> {
    return await this.userRepo.findOneOrFail({ where: { id } })
  }

  async update(req: IAppUser): Promise<IAppUser> {
    const data = this.userRepo.create(req)
    await this.userRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IAppUser> {
    const data = (await this.findOneOrFail(id)) as AppUser
    return await this.userRepo.remove(data)
  }

  async softRemove(id: string): Promise<IAppUser> {
    const data = (await this.findOneOrFail(id)) as AppUser
    return await this.userRepo.softRemove(data)
  }

  // Another findOneBy() Methods

  public async findOneByEmail(email: string): Promise<IAppUser> {
    return await this.userRepo.findOneOrFail({ where: { email } })
  }

  public async findOneByPhoneNumber(phoneNumber: string): Promise<IAppUser> {
    return await this.userRepo.findOneOrFail({ where: { phoneNumber } })
  }

  public async findOneByToken(token: string): Promise<IAppUser> {
    return await this.userRepo.findOneOrFail({ where: { token } })
  }
}
