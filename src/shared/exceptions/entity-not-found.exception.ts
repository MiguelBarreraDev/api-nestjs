import { NotFoundException } from '@nestjs/common';

/**
 * Generic entity not found exception
 */
export class EntityNotFoundException extends NotFoundException {
  constructor(readonly entity?: string, readonly id?: string) {
    super(`${entity} ${id || 'instance'} not found`);
  }
}
