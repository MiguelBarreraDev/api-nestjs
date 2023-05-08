import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CentroMedicoService } from './centro-medico.service';
import { CreateCentroMedicoDto } from './dto/create-centro-medico.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { UpdateCentroMedicoDto } from './dto/update-centro-medico.dto';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Centro Medico')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('centro-medico')
export class CentroMedicoController {
  constructor(private readonly centroMedicoService: CentroMedicoService) {}

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get('search')
  search(@Query() searchQueryDto: SearchQueryDto) {
    return this.centroMedicoService.search(searchQueryDto);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get()
  findAll() {
    return this.centroMedicoService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No se encontró el centro medico' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.centroMedicoService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCentroMedicoDto) {
    return this.centroMedicoService.create(body);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'No se encontró el centro medico' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCentroMedicoDto,
  ) {
    return this.centroMedicoService.update(id, body);
  }
}
