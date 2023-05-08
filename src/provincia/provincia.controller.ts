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
} from '@nestjs/swagger';

import { ProvinciaService } from './provincia.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiBearerAuth('access-token')
@ApiTags('Provincia')
@UseGuards(JwtAuthGuard)
@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.provinciaService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No se encontró la provincia' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.provinciaService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'No se encontró la provincia' })
  @Get(':id/distritos')
  districts(@Param('id', ParseUUIDPipe) id: string) {
    return this.provinciaService.districts(id);
  }
}
