import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/src/infrastructure/index/index.interface'
import { AppUser } from '../entities/user.entity'
import { IAppUser } from '../interfaces/user.interface'
import { UserIndexRequest } from '../requests/user-index.request'
import { UserRequest, UserUpdateRequest } from '../requests/user.request'
import { UserIndexService } from '../services/user-index.service'
import { UserService } from '../services/user.service'

@Injectable()
export class UserCrudApp {
  constructor(
    private readonly userIndexApp: UserIndexService,
    private readonly userService: UserService,
  ) {}

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IAppUser>> {
    const res = await this.userIndexApp.fetch(req)
    return res
  }

  async create(req: UserRequest): Promise<IAppUser> {
    const data = new AppUser()
    Object.assign(data, req)

    return await this.userService.create(data)
  }

  async find(): Promise<IAppUser[]> {
    return await this.userService.find()
  }

  async findOneOrFail(id: string): Promise<IAppUser> {
    return await this.userService.findOneOrFail(id)
  }

  async update(id: string, req: UserUpdateRequest): Promise<IAppUser> {
    const data = await this.userService.findOneOrFail(id)

    data.name = req.name
    data.phoneNumber = req.phoneNumber
    data.avatar = req.avatar
    data.address = req.address

    return await this.userService.update(data)
  }

  async remove(id: string): Promise<IAppUser> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IAppUser> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.softRemove(id)
    return data
  }
}
