import { ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/modules/user/role/enums/role.enum';
import { LoggedInGuard } from './logged-in.guard';

@Injectable()
export class AdminStoreGuard extends LoggedInGuard {
	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();
		return (
			super.canActivate(context) &&
			req.user.role === Role.Administrator ||
			req.user.role === Role.AdminStore
		);
	}
}
