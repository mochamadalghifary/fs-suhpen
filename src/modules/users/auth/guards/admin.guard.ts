import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role } from 'src/modules/users/role/enums/role.enum'

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) throw err || new UnauthorizedException()
    if (user.role != Role.Administrator) throw err || new ForbiddenException()

    return user
  }
}
