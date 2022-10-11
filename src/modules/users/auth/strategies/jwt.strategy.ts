import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppUser } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
import { IJwtPayload } from './jwt-payload-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private memberService: UserService) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IJwtPayload): Promise<IAppUser> {
        const { id } = payload;
        const member = await this.memberService.findOneOrFail(id);

        if (!member) {
            throw new UnauthorizedException();
        }

        return member;
    }
}
