import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PayloadEncodeInterface } from 'src/auth/interfaces/payload.interface';

@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const allowedRoles = this.reflector.getAllAndOverride<number[]>(
      'allowed-roles',
      [context.getHandler(), context.getClass()],
    );

    if (!allowedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: PayloadEncodeInterface = request.user;

    return allowedRoles.includes(user.groupId);
  }
}
