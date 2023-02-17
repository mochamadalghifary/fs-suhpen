import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  UserCreateRequest,
  UserIndexRequest,
  UserUpdateRequest,
} from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosService.get(Route.Users, req)
  },

  create: async (data: UserCreateRequest): Promise<IApiRes<UserResponse>> => {
    data.password = data.email
    const res = await axiosService.post(Route.Users, data)
    !res.data && alert(res.response.data.message)
    return res
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.get(`${Route.Users}/${id}`)
  },

  update: async (data: UserUpdateRequest): Promise<IApiRes<UserResponse>> => {
    const res = await axiosService.put(Route.Profile, data)
    !res.data && alert(res.response.data.message)
    return res
  },

  remove: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.delete(`${Route.Users}/${id}`)
  },
}
