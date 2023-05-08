import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HitosContacto } from 'src/hitos-contacto/entities/hitos-contacto.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class HitosContactoService {
  constructor(
    @InjectRepository(HitosContacto)
    private hitosContactoRepository: Repository<HitosContacto>,
  ) {}

  /**
   * Recupera todos los hitos contacto almacenados
   * @returns Lista de hitos contacto
   */
  findAll() {
    return this.hitosContactoRepository.find();
  }

  /**
   * Recupera un hitos contacto indentificado por su id
   * @param id - identificador de hitos contacto
   * @returns hitos contacto
   */
  async findOne(id: string) {
    const hitosContacto = await this.hitosContactoRepository.findOneBy({
      pkHitoContacto: id,
    });

    if (!hitosContacto) {
      throw new EntityNotFoundException(HitosContacto.name, id);
    }

    return hitosContacto;
  }
}
