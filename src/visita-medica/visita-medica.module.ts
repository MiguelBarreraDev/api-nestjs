import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisitaMedicaController } from './visita-medica.controller';
import { VisitaMedicaService } from './visita-medica.service';

import { VisitaMedica } from 'src/visita-medica/entities/visita-medica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitaMedica])],
  controllers: [VisitaMedicaController],
  providers: [VisitaMedicaService],
  exports: [VisitaMedicaService],
})
export class VisitaMedicaModule {}
