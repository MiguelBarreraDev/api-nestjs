import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { MedicoHitosService } from './medico-hitos.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Medico Hitos')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('medico-hitos')
export class MedicoHitosController {
  constructor(private readonly medicoHitosService: MedicoHitosService) {}

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.medicoHitosService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({
    description: 'No se encontró la relación entre medico e hito',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicoHitosService.findOne(id);
  }
}
