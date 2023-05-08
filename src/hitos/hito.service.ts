import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';

import { Hito } from 'src/hitos/entities/hito.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class HitoService {
  constructor(
    @InjectRepository(Hito) private hitoRepository: Repository<Hito>,
  ) {}

  /**
   * Crear un hito
   * @param createHitoDto - Propiedades del hito a crear
   * @returns El hito creado
   */
  create(createHitoDto: CreateHitoDto) {
    return this.hitoRepository.save(createHitoDto);
  }

  /**
   * Recupera todos los hitos
   * @returns Lista de hitos
   */
  findAll() {
    return this.hitoRepository.find();
  }

  /**
   * Recupera un hito especificado por su id
   * @param id - Identificador del hito
   * @returns Un hito
   */
  async findOne(id: string) {
    const hito = await this.hitoRepository.findOneBy({ pkHito: id });

    if (!hito) {
      throw new EntityNotFoundException(Hito.name, id);
    }

    return hito;
  }

  /**
   * Actualiza un hito en específico por su id
   * @param id - Identificador del hito
   * @param updateHitoDto - Propiedad del hito a actualizar
   * @returns El hito actualizado
   */
  async update(id: string, updateHitoDto: UpdateHitoDto) {
    const hito = await this.hitoRepository.findOneBy({ pkHito: id });

    if (!hito) {
      throw new EntityNotFoundException(Hito.name, id);
    }

    return this.hitoRepository.save({ ...hito, ...updateHitoDto });
  }

  /**
   * Elimina un hito de la base de datos
   * @param id - Identificador del hito
   * @returns EL hito eliminado
   */
  async remove(id: string) {
    const hito = await this.hitoRepository.findOneBy({ pkHito: id });

    if (!hito) {
      throw new EntityNotFoundException(Hito.name, id);
    }

    return this.hitoRepository.remove(hito);
  }
}
