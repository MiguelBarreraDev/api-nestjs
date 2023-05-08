import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoContactoController } from './tipo-contacto.controller';
import { TipoContactoService } from './tipo-contacto.service';

import { TipoContacto } from 'src/tipo-contacto/entities/tipo-contacto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoContacto])],
  controllers: [TipoContactoController],
  providers: [TipoContactoService],
})
export class TipoContactoModule {}
