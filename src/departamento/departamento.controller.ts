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
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Departamento')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request' })
@UseGuards(JwtAuthGuard)
@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.departamentoService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró el departamento' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentoService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateDepartamentoDto) {
    return this.departamentoService.create(body);
  }

  @ApiNotFoundResponse({ description: 'No se encontró el departamento' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateDepartamentoDto,
  ) {
    return this.departamentoService.update(id, body);
  }

  @ApiNotFoundResponse({ description: 'No se encontró el departamento' })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentoService.delete(id);
  }

  @Get(':id/provincias')
  provinces(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentoService.provinces(id);
  }
}
