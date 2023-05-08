import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTipoContactoDto } from './dto/create-tipo-contacto.dto';
import { UpdateTipoContactoDto } from './dto/update-tipo-contacto.dto';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { TipoContacto } from 'src/tipo-contacto/entities/tipo-contacto.entity';

@Injectable()
export class TipoContactoService {
  constructor(
    @InjectRepository(TipoContacto)
    private tipoContactoRepository: Repository<TipoContacto>,
  ) {}

  /**
   * Obtiene un tipo de contacto por su id
   * @param id - Id del tipo de contacto
   * @returns Tipo de contacto
   */
  async getTipoContacto(id: string): Promise<TipoContacto> {
    const tipoContacto = await this.tipoContactoRepository.findOneBy({
      pkTipoContacto: id,
    });

    if (!tipoContacto) {
      throw new EntityNotFoundException(TipoContacto.name, id);
    }

    return tipoContacto;
  }

  /**
   * Crea un nuevo tipo de contacto
   * @param createTipoContactoDto - Propiedades para el tipo de contacto
   * @returns El tipo de contacto creado
   */
  create(createTipoContactoDto: CreateTipoContactoDto) {
    return this.tipoContactoRepository.save(createTipoContactoDto);
  }

  /**
   * Recupera todos los tipos de contacto almacenados
   * @return Lista de tipos de contacto
   */
  findAll() {
    return this.tipoContactoRepository.find();
  }

  /**
   * Busca un tipo de contacto por su id
   * @param id - Id del tipo de contacto
   * @return - El tipo de contacto encontrado
   */
  findOne(id: string) {
    return this.getTipoContacto(id);
  }

  /**
   * Actualiza un tipo de contacto por su id
   * @param id - Id del tipo de contacto
   * @param updateTipoContactoDto - Propiedades para el tipo de contacto
   * @returns El tipo de contacto actualizado
   */
  async update(id: string, updateTipoContactoDto: UpdateTipoContactoDto) {
    const tipoContacto = await this.getTipoContacto(id);

    return this.tipoContactoRepository.save({
      ...tipoContacto,
      ...updateTipoContactoDto,
    });
  }

  /**
   * Elimina un tipo de contacto por su id
   * @param id - Id del tipo de contacto
   * @returns El tipo de contacto eliminado
   */
  async remove(id: string) {
    const tipoContacto = await this.getTipoContacto(id);
    return this.tipoContactoRepository.remove(tipoContacto);
  }
}
