import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { groups } from '../constants';

/**
 * Guard para verificar si el usuario es administrador
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const groupId = request.user?.groupId;
    return groupId === groups.VISITADOR_ADMIN_ID;
  }
}
