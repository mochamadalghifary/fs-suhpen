import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppUser } from '../entities/user.entity';
import { IAppUser } from '../interfaces/user.interface';

export const GetUserLogged = createParamDecorator(
    async (data, ctx: ExecutionContext): Promise<IAppUser> => {
        const req = ctx.switchToHttp().getRequest();

        const getConnection = await new DataSource({
            type: 'mysql',
        }).initialize();

        return getConnection.manager.getRepository(AppUser).findOneOrFail(req?.user.id)
    },
);
