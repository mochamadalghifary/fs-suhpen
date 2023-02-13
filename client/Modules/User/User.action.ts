import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  UserCreateRequest,
  UserIndexRequest,
} from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosService.get(Route.Users, req)
  },

  create: async (data: UserCreateRequest): Promise<IApiRes<UserResponse>> => {
    return await axiosService.post(Route.Users, data)
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.get(`${Route.Users}/${id}`)
  },

  remove: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.delete(`${Route.Users}/${id}`)
  },
}
