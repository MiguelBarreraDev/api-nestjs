import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, IsNull, Repository } from 'typeorm';

import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

import { Departamento } from 'src/departamento/entities/departamento.entity';
import { EntityNotFoundException } from 'src/shared/exceptions/entity-not-found.exception';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departmentRepository: Repository<Departamento>,
  ) {}

  /**
   * Recupera todos los departamentos
   * @returns Lista de departamentos
   */
  findAll(): Promise<Departamento[]> {
    return this.departmentRepository.find();
  }

  /**
   * Recupera un departamento identificado por su id
   * @param id - Identificador del departamento
   * @returns Un departamento
   */
  async findOne(id: string): Promise<Departamento> {
    const departamento = await this.departmentRepository.findOneBy({
      pkDepartamento: id,
    });

    if (!departamento) {
      throw new EntityNotFoundException(Departamento.name, id);
    }

    return departamento;
  }

  /**
   * Crea un nuevo departamento y lo almacena en la base de datos
   * @param body - Propiedades del objeto departamento
   * @returns El departamento creado
   */
  create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    return this.departmentRepository.save(createDepartamentoDto);
  }

  /**
   * Actualiza un departamento identificado por su id
   * @param id - Identificador del departamento
   * @param body - Propiedades a actualizar
   * @returns Departamento actualizado
   */
  async update(id: string, body: UpdateDepartamentoDto): Promise<Departamento> {
    const departamento = await this.departmentRepository.findOneBy({
      pkDepartamento: id,
    });

    if (!departamento) {
      throw new EntityNotFoundException(Departamento.name, id);
    }

    return this.departmentRepository.save({ ...departamento, ...body });
  }

  /**
   * Elimina un departamento de la base de datos
   * @param id - Identificador del departamento
   * @returns Departamento eliminado
   */
  async delete(id: string): Promise<Departamento> {
    const departamento = await this.departmentRepository.findOneBy({
      pkDepartamento: id,
    });

    if (!departamento) {
      throw new EntityNotFoundException(Departamento.name, id);
    }

    return this.departmentRepository.remove(departamento);
  }

  /**
   * Obtiene todos los departamentos que no estén eliminados
   * @param orderType - Tipo de ordenamiento ('ASC' | 'DESC' | 'asc' | 'desc')
   * @returns Lista de departamentos
   */
  findActives(orderType: FindOptionsOrderValue = 'ASC') {
    return this.departmentRepository.find({
      where: {
        eliminadoEl: IsNull(),
      },
      order: {
        departamento: orderType,
      },
    });
  }

  /**
   * Obtiene las provincias de un departamento
   * @param departmentId - Identificador del departamento
   * @returns Lista de provincias
   */
  provinces(departmentId: string) {
    return this.departmentRepository.findOne({
      where: { pkDepartamento: departmentId },
      relations: ['provinces'],
    });
  }
}
