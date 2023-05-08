import { PartialType } from '@nestjs/swagger';

import { CreateCentroMedicoDto } from './create-centro-medico.dto';

export class UpdateCentroMedicoDto extends PartialType(CreateCentroMedicoDto) {}
