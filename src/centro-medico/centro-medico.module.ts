import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CentroMedicoController } from './centro-medico.controller';
import { CentroMedicoService } from './centro-medico.service';
import { CentroMedicoSearchRepository } from './repositories/centro-medico-search.repository';

import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CentroMedico])],
  controllers: [CentroMedicoController],
  providers: [CentroMedicoService, CentroMedicoSearchRepository],
  exports: [CentroMedicoService],
})
export class CentroMedicoModule {}
