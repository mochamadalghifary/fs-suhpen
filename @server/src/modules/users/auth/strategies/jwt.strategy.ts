import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Exception } from '@server/src/common/exceptions/index.exception'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IAppUser } from '../../user/interfaces/user.interface'
import { UserService } from '../../user/services/user.service'
import { IJwtPayload } from './jwt-payload-interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: IJwtPayload): Promise<IAppUser> {
    const { id } = payload
    const member = await this.userService.findOneOrFail(id)

    !member && Exception.unauthorized()

    return member
  }
}
