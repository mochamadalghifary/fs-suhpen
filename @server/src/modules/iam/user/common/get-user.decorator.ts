import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IAppUser } from '../interfaces/user.interface'

export const GetUserLogged = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<IAppUser> => {
    return ctx.switchToHttp().getRequest().user
  },
)
