import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicoHitosController } from './medico-hitos.controller';
import { MedicoHitosService } from './medico-hitos.service';

import { MedicoHitos } from 'src/medico-hitos/entities/medico-hitos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicoHitos])],
  controllers: [MedicoHitosController],
  providers: [MedicoHitosService],
  exports: [MedicoHitosService],
})
export class MedicoHitosModule {}
