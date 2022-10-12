import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginateResponse } from 'src/infrastructure/index/index.interface'
import { BaseIndexService } from 'src/infrastructure/index/index.service'
import { Repository } from 'typeorm'
import { AppUser } from '../entities/user.entity'
import { IAppUser } from '../interfaces/user.interface'
import { UserIndexRequest } from '../requests/user-index.request'

@Injectable()
export class UserIndexService extends BaseIndexService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepo: Repository<IAppUser>,
  ) {
    super()
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IAppUser>> {
    const TABLE_NAME = this.userRepo.metadata.tableName
    const TABLE_KEYS = Object.keys(this.userRepo.metadata.propertiesMap)

    const query = this.userRepo.createQueryBuilder(TABLE_NAME)

    if (req.search) {
      query.where(this.querySearch(TABLE_NAME, TABLE_KEYS), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    query.orderBy(
      this.orderByKey(TABLE_NAME, TABLE_KEYS, req.sort),
      this.getOrder(req.order),
    )
    query.take(this.take(req.perPage))
    query.skip(this.countOffset(req))

    const [data, count] = await query.getManyAndCount()

    return {
      data,
      meta: this.mapMeta(count, req),
    }
  }
}
