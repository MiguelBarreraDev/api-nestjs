import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

import { Tareas } from 'src/tareas/entities/tareas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tareas])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
