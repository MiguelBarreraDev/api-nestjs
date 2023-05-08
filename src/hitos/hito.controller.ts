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

import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';
import { HitoService } from './hito.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Hitos')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('hitos')
export class HitosController {
  constructor(private readonly hitoService: HitoService) {}

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createHitoDto: CreateHitoDto) {
    return this.hitoService.create(createHitoDto);
  }

  @Get()
  findAll() {
    return this.hitoService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No se econtró el hito' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hitoService.findOne(id);
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'No se econtró el hito' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHitoDto: UpdateHitoDto,
  ) {
    return this.hitoService.update(id, updateHitoDto);
  }

  @ApiNotFoundResponse({ description: 'No se econtró el hito' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hitoService.remove(id);
  }
}
