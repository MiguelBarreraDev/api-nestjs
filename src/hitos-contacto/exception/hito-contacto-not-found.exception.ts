import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Especific hito contacto not found exception
 */
export class HitoContactoNotfoundException extends HttpException {
  constructor(id: string) {
    super(`Hito contacto with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
