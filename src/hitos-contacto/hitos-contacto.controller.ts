import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { HitosContactoService } from './hitos-contacto.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Hitos contacto')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('hitos-contacto')
export class HitosContactoController {
  constructor(private readonly hitosContactoService: HitosContactoService) {}

  @Get()
  findAll() {
    return this.hitosContactoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hitosContactoService.findOne(id);
  }
}
