import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { AppUser } from '../entities/user.entity'
import { IAppUser } from '../interfaces/user.interface'
import { UserIndexRequest } from '../requests/user-index.request'

export class UserIndexService extends BaseIndexService {
  constructor(
    private readonly userRepo: Repository<IAppUser>
  ) { super() }

  additionalQuery(query: SelectQueryBuilder<IAppUser>, req: UserIndexRequest)
    : SelectQueryBuilder<IAppUser> {
    req
    // Do Additional Query
    return query
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IAppUser>> {
    const tableName = AppUser.name
    const tableKey = Object.keys(new AppUser())

    const query = this.additionalQuery(this.userRepo.createQueryBuilder(tableName), req)

    req.search && query.where(this.querySearch(tableName, tableKey), {
      search: `%${req.search.toLowerCase()}%`,
    })

    query.orderBy(this.orderByKey(tableName, tableKey, req.sort), this.getOrder(req.order))
    query.take(this.take(req.perPage))
    query.skip(this.countOffset(req))

    const [data, count] = await query.getManyAndCount()

    return {
      data,
      meta: this.mapMeta(count, req),
    }
  }
}
