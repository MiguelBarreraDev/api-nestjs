import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { Tareas } from 'src/tareas/entities/tareas.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tareas)
    private tareasRepository: Repository<Tareas>,
  ) {}

  /**
   * Busca una tarea
   * @param id - Id de la tarea
   * @returns Tarea encontrada
   */
  async getTarea(id: string): Promise<Tareas> {
    const tarea = await this.tareasRepository.findOneBy({ pkTarea: id });

    if (!tarea) {
      throw new EntityNotFoundException(Tareas.name, id);
    }

    return tarea;
  }

  /**
   * Crea una tareas y la almacena en la base de datos
   * @param createTareaDto - Propiedades para crear una tarea
   * @returns La tarea creada
   */
  create(createTareaDto: CreateTareaDto): Promise<Tareas> {
    return this.tareasRepository.save(createTareaDto);
  }

  /**
   * Recupera todas las tareas almacenadas
   * @returns Lista de tareas
   */
  findAll(): Promise<Tareas[]> {
    return this.tareasRepository.find();
  }

  /**
   * Busca una tarea por su id
   * @param id - Id de la tarea
   * @returns La tarea encontrada
   */
  async findOne(id: string): Promise<Tareas> {
    return await this.getTarea(id);
  }

  /**
   * Actualiza una tarea
   * @param id - Identificador de la tarea
   * @param updateTareaDto - Propiedades para actualizar una tarea
   * @returns La tarea actualizada
   */
  async update(id: string, updateTareaDto: UpdateTareaDto): Promise<Tareas> {
    const tarea = await this.getTarea(id);

    return this.tareasRepository.save({
      ...tarea,
      ...updateTareaDto,
    });
  }

  /**
   * Elimina una tarea
   * @param id - Identificador de la tarea
   * @returns La tarea eliminada
   */
  async remove(id: string): Promise<Tareas> {
    const tarea = await this.getTarea(id);
    return this.tareasRepository.remove(tarea);
  }
}
