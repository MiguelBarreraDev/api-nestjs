import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTareasCategoriaDto } from './dto/create-tareas-categoria.dto';
import { UpdateTareasCategoriaDto } from './dto/update-tareas-categoria.dto';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

@Injectable()
export class TareasCategoriasService {
  constructor(
    @InjectRepository(TareasCategorias)
    private tareasCategoriasRepository: Repository<TareasCategorias>,
  ) {}

  /**
   * Crea una categoría de tareas en la base de datos
   * @param createTareasCategoriaDto - Propiedades para crear la nueva categoría de tareas
   * @returns La categoría creada
   */
  create(createTareasCategoriaDto: CreateTareasCategoriaDto) {
    return this.tareasCategoriasRepository.save(createTareasCategoriaDto);
  }

  /**
   * Recupera todas las categorías de tareas almacenadas
   * @returns Lista de categorías de tareas
   */
  findAll() {
    return this.tareasCategoriasRepository.find();
  }

  /**
   * Recupera una categoría identificada por su id
   * @param id - Identificador de la categoría
   * @returns Categoría de tareas
   */
  async findOne(id: string) {
    const categoria = await this.tareasCategoriasRepository.findOneBy({
      pkTareasCategoria: id,
    });

    if (!categoria) {
      throw new EntityNotFoundException(TareasCategorias.name, id);
    }

    return categoria;
  }

  /**
   * Actualiza una categoría de tareas en la base de datos
   * @param id - Identificador de la categoría
   * @param updateTareasCategoriaDto - Propiedades para actualizar la categoría de tareas
   * @returns La categoría actualizada
   */
  async update(id: string, updateTareasCategoriaDto: UpdateTareasCategoriaDto) {
    const categoria = await this.tareasCategoriasRepository.findOneBy({
      pkTareasCategoria: id,
    });

    if (!categoria) {
      throw new EntityNotFoundException(TareasCategorias.name, id);
    }

    return this.tareasCategoriasRepository.save({
      ...categoria,
      ...updateTareasCategoriaDto,
    });
  }

  /**
   * Elimina una categoría de tareas en la base de datos
   * @param id - Identificador de la categoría
   * @returns La categoría eliminada
   */
  async remove(id: string) {
    const categoria = await this.tareasCategoriasRepository.findOneBy({
      pkTareasCategoria: id,
    });

    if (!categoria) {
      throw new EntityNotFoundException(TareasCategorias.name, id);
    }

    return this.tareasCategoriasRepository.remove(categoria);
  }
}
