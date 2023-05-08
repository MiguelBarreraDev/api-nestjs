import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para definir los roles permitidos para acceder a un recurso
 * @param roles Roles permitidos para acceder al recurso
 * @returns SetMetadata con los roles permitidos para acceder al recurso
 */
export const AllowedRoles = (...roles: number[]) =>
  SetMetadata('allowed-roles', roles);
