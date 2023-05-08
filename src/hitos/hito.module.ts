import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HitosController } from './hito.controller';
import { HitoService } from './hito.service';

import { Hito } from 'src/hitos/entities/hito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hito])],
  controllers: [HitosController],
  providers: [HitoService],
})
export class HitoModule {}
