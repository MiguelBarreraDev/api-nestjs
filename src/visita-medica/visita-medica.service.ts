import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Raw, Repository } from 'typeorm';

import { CreateVisitaMedicaDto } from './dto/create-visita-medica.dto';
import { UpdateVisitaMedicaDto } from './dto/update-visita-medica.dto';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { VisitaMedica } from 'src/visita-medica/entities/visita-medica.entity';

@Injectable()
export class VisitaMedicaService {
  constructor(
    @InjectRepository(VisitaMedica)
    private visitaMedicaRepository: Repository<VisitaMedica>,
  ) {}

  /**
   * Obtiene una visita médica por su id
   * @param id Id de la visita médica
   * @returns La visita médica obtenida
   */
  async getVisitaMedica(id: string): Promise<VisitaMedica> {
    const visitaMedica = await this.visitaMedicaRepository.findOneBy({
      pkVisitaMedica: id,
    });

    if (!visitaMedica) {
      throw new EntityNotFoundException(VisitaMedica.name, id);
    }

    return visitaMedica;
  }

  /**
   * Crea una nueva visita médica
   * @param createVisitaMedicaDto Propiedades para crear la visita médica
   * @returns La visita médica creada
   */
  create(createVisitaMedicaDto: CreateVisitaMedicaDto): Promise<VisitaMedica> {
    return this.visitaMedicaRepository.save(createVisitaMedicaDto);
  }

  /**
   * Encuentra todas las visitas medicas almacenadas en la base de datos
   * @returns Lista de las visitas médicas
   */
  findAll(): Promise<VisitaMedica[]> {
    return this.visitaMedicaRepository.find();
  }

  /**
   * Encuentra una visita médica por su id
   * @param id Identificador de la visita médica
   * @returns La visita médica
   */
  findOne(id: string): Promise<VisitaMedica> {
    return this.getVisitaMedica(id);
  }

  /**
   * Actualiza una visita médica
   * @param id Identificador de la visita médica
   * @param updateVisitaMedicaDto - Propiedades para actualizar la visita médica
   * @returns La visita médica actualizada
   */
  async update(
    id: string,
    updateVisitaMedicaDto: UpdateVisitaMedicaDto,
  ): Promise<VisitaMedica> {
    const visitaMedica = await this.getVisitaMedica(id);

    return this.visitaMedicaRepository.save({
      ...visitaMedica,
      ...updateVisitaMedicaDto,
    });
  }

  /**
   * Elimina una visita médica
   * @param id Identificador de la visita médica
   * @returns La visita médica eliminada
   */
  async remove(id: string): Promise<VisitaMedica> {
    const visitaMedica = await this.getVisitaMedica(id);
    return this.visitaMedicaRepository.remove(visitaMedica);
  }

  /**
   * Obtiene las visitas médicas asginadas a un grupo de visitadores
   * @param visitadoresId - lista de ids de usuario con rol de visitador (groupId = 17)
   * @returns Lista de visitas medicas
   */
  async findByVisitadoresId(visitadoresId: number[]) {
    return this.visitaMedicaRepository.findBy({
      fkUsuario: In(visitadoresId),
    });
  }

  /**
   * Calcula la cantidad de visitas médicas asignadas a un grupo de visitadores
   * @param visitadoresId - Lista de ids de usuarios con rol de visitador (groupId = 17)
   * @returns Número de visitas médicas
   */
  async countByVisitadoresId(visitadoresId: number[]) {
    return this.visitaMedicaRepository.countBy({
      fkUsuario: In(visitadoresId),
    });
  }

  /**
   * Calcula la cantidad de visitas médicas asignadas a un grupo de visitadores en el útlimo mes
   * @param visitadoresId - Lista de ids de usuarios con rol de visitador (groupId = 17)
   * @returns Número de visitas médicas
   */
  countOfTheLastMonth(visitadoresId: number[]) {
    return this.visitaMedicaRepository.count({
      where: {
        fkMedico: Not(IsNull()),
        eliminadoEl: IsNull(),
        fecha: Raw(
          (alias) =>
            `${alias} between date_trunc('month', current_date) and (date_trunc('month', current_date) + interval '1 month')`,
        ),
        fkUsuario: In(visitadoresId),
      },
    });
  }
}
