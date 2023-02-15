import { InjectRepository } from '@nestjs/typeorm'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { AppUser } from './user.entity'
import { UserIndexRequest } from './user.request'

export class UserIndexService extends BaseIndexService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepo: Repository<IAppUser>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IAppUser>,
    req: UserIndexRequest,
  ): SelectQueryBuilder<IAppUser> {
    if (req.role) {
      query.andWhere('user.role = :role', {
        role: req.role,
      })
    }

    return query
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IAppUser>> {
    const tableName = 'user'
    const tableKey = ['name', 'email', 'role', 'phoneNumber']

    const query = this.additionalQuery(
      this.userRepo.createQueryBuilder(tableName),
      req,
    )

    if (req.search) {
      query.andWhere(this.querySearch(tableName, tableKey), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    query.orderBy(
      this.orderByKey(tableName, tableKey, req.sort),
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
