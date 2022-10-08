import {
	CanActivate,
	ExecutionContext,
	Injectable
} from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const data = context.switchToHttp().getRequest().user

		return !!data
	}
}
