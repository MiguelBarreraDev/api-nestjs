import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TareasCategoriasController } from './tareas-categorias.controller';
import { TareasCategoriasService } from './tareas-categorias.service';

import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TareasCategorias])],
  controllers: [TareasCategoriasController],
  providers: [TareasCategoriasService],
})
export class TareasCategoriasModule {}
