import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role } from '@server/src/modules/iam/role/enums/role.enum'

@Injectable()
export class Admin2Guard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException()
    if (user.role != Role.Administrator || user.role != Role.AdminSecond)
      throw err || new ForbiddenException()

    return user
  }
}
