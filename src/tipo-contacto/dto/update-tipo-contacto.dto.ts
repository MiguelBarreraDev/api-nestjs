import { PartialType } from '@nestjs/swagger';

import { CreateTipoContactoDto } from './create-tipo-contacto.dto';

export class UpdateTipoContactoDto extends PartialType(CreateTipoContactoDto) {}
