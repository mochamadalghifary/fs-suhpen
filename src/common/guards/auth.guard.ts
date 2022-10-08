import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	handleRequest(err, user) {
		return user;
	}
}
