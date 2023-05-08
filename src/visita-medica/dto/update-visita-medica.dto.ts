import { PartialType } from '@nestjs/swagger';

import { CreateVisitaMedicaDto } from './create-visita-medica.dto';

export class UpdateVisitaMedicaDto extends PartialType(CreateVisitaMedicaDto) {}
