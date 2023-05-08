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

import { CreateVisitaMedicaDto } from './dto/create-visita-medica.dto';
import { UpdateVisitaMedicaDto } from './dto/update-visita-medica.dto';
import { VisitaMedicaService } from './visita-medica.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Visita Medica')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'Ok' })
@UseGuards(JwtAuthGuard)
@Controller('visita-medica')
export class VisitaMedicaController {
  constructor(private readonly visitaMedicaService: VisitaMedicaService) {}

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() visitaMedicaDto: CreateVisitaMedicaDto) {
    return this.visitaMedicaService.create(visitaMedicaDto);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.visitaMedicaService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró la visita médica' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.visitaMedicaService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró la visita médica' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() visitaMedicaDto: UpdateVisitaMedicaDto,
  ) {
    return this.visitaMedicaService.update(id, visitaMedicaDto);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró la visita médica' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.visitaMedicaService.remove(id);
  }
}
