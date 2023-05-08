import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HitosContactoController } from './hitos-contacto.controller';
import { HitosContactoService } from './hitos-contacto.service';

import { HitosContacto } from 'src/hitos-contacto/entities/hitos-contacto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HitosContacto])],
  controllers: [HitosContactoController],
  providers: [HitosContactoService],
})
export class HitosContactoModule {}
