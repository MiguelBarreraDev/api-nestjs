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

import { CreateTareasCategoriaDto } from './dto/create-tareas-categoria.dto';
import { UpdateTareasCategoriaDto } from './dto/update-tareas-categoria.dto';
import { TareasCategoriasService } from './tareas-categorias.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Tareas Categorías')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('tareas-categorias')
export class TareasCategoriasController {
  constructor(
    private readonly tareasCategoriasService: TareasCategoriasService,
  ) {}

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createTareasCategoriaDto: CreateTareasCategoriaDto) {
    return this.tareasCategoriasService.create(createTareasCategoriaDto);
  }

  @Get()
  findAll() {
    return this.tareasCategoriasService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No se encontró la categoría de tareas' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasCategoriasService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'No se encontró la categoría de tareas' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTareasCategoriaDto: UpdateTareasCategoriaDto,
  ) {
    return this.tareasCategoriasService.update(id, updateTareasCategoriaDto);
  }

  @ApiNotFoundResponse({ description: 'No se encontró la categoría de tareas' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasCategoriasService.remove(id);
  }
}
