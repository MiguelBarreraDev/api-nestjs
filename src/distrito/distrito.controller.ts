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

import { DistritoService } from './distrito.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiBearerAuth('access-token')
@ApiTags('Distrito')
@UseGuards(JwtAuthGuard)
@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.distritoService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró el distrito' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.distritoService.findOne(id);
  }
}
