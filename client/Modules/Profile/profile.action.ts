import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const profileAction = {
  getUserLogged: async (): Promise<IApiRes<UserResponse>> => {
    return await axiosService.get(Route.Profile)
  },

  update: async (data: UserUpdateRequest): Promise<IApiRes<UserResponse>> => {
    return await axiosService.put(Route.Profile, data)
  },
}
