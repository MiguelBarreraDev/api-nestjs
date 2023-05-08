import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateTipoContactoDto } from './dto/create-tipo-contacto.dto';
import { UpdateTipoContactoDto } from './dto/update-tipo-contacto.dto';
import { TipoContactoService } from './tipo-contacto.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Tipos de contacto')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('tipo-contacto')
export class TipoContactoController {
  constructor(private readonly tipoContactoService: TipoContactoService) {}

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createTipoContactoDto: CreateTipoContactoDto) {
    return this.tipoContactoService.create(createTipoContactoDto);
  }

  @Get()
  findAll() {
    return this.tipoContactoService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No se encontró el tipo contacto' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoContactoService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'No se encontró el tipo contacto' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTipoContactoDto: UpdateTipoContactoDto,
  ) {
    return this.tipoContactoService.update(id, updateTipoContactoDto);
  }

  @ApiNotFoundResponse({ description: 'No se encontró el tipo contacto' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoContactoService.remove(id);
  }
}
