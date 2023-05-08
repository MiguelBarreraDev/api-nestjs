import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { CreateCentroMedicoDto } from './dto/create-centro-medico.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { UpdateCentroMedicoDto } from './dto/update-centro-medico.dto';
import { CentroMedicoSearchRepository } from './repositories/centro-medico-search.repository';

import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class CentroMedicoService {
  constructor(
    private centroMedicoSearchRepository: CentroMedicoSearchRepository,
    @InjectRepository(CentroMedico)
    private centroMedicoRepository: Repository<CentroMedico>,
  ) {}

  /**
   * Buscar centros médicos por palabra clave
   * @param query - Palabra clave para buscar centros médicos
   * @returns Lista de centros médicos que coinciden con la palabra clave
   */
  search(searchQueryDto: SearchQueryDto) {
    return this.centroMedicoSearchRepository.search(searchQueryDto);
  }

  /**
   * Recuperar todos los centros médicos almacenados
   * @returns Lista de centros médicos
   */
  findAll() {
    return this.centroMedicoRepository.find({
      relations: ['provincia', 'distrito', 'departamento'],
    });
  }

  /**
   * Encuentra un centro médico identificado por su id
   * @param id - Identificador del centro médico
   * @returns Un centro médico
   */
  async findOne(id: string) {
    const centroMedico = await this.centroMedicoRepository.findOneBy({
      pkCentroMedico: id,
    });

    if (!centroMedico) {
      throw new EntityNotFoundException(CentroMedico.name, id);
    }

    return centroMedico;
  }

  /**
   * Crea un nuevo centro médico
   * @param body - Propiedades para crear la nueva instancia
   * @returns La instancia creada
   */
  create(createCentroMedicoDto: CreateCentroMedicoDto) {
    return this.centroMedicoRepository.save(createCentroMedicoDto);
  }

  /**
   * Actualiza un centro médico identificado por su id
   * @param id - Identificador del céntro medico
   * @param body - Propiedades que serán actualizadas
   * @returns Centro médico con los valores actualizados
   */
  async update(id: string, body: UpdateCentroMedicoDto) {
    const centroMedico = await this.centroMedicoRepository.findOneBy({
      pkCentroMedico: id,
    });

    if (!centroMedico) {
      throw new EntityNotFoundException(CentroMedico.name, id);
    }

    const updateCentroMedico = {
      ...centroMedico,
      ...body,
    };

    return this.centroMedicoRepository.save(updateCentroMedico);
  }

  /**
   * Elimina un centro médico identificado por su id
   * @param id - Identificador del centro médico
   * @return Centro medico eliminado
   */
  async delete(id: string) {
    const centroMedico = await this.centroMedicoRepository.findOneBy({
      pkCentroMedico: id,
    });

    if (!centroMedico) {
      throw new EntityNotFoundException(CentroMedico.name, id);
    }

    return this.centroMedicoRepository.remove(centroMedico);
  }

  /**
   * Cálcula la cantidad de centros médicos que se encuentren activos
   * @returns Número de centros médicos
   */
  countActives() {
    return this.centroMedicoRepository.count({
      where: {
        eliminadoEl: IsNull(),
      },
    });
  }
}
