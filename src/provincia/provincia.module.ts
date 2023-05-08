import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Provincia } from './entities/provincia.entity';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
