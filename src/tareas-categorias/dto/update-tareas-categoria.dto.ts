import { PartialType } from '@nestjs/swagger';

import { CreateTareasCategoriaDto } from './create-tareas-categoria.dto';

export class UpdateTareasCategoriaDto extends PartialType(
  CreateTareasCategoriaDto,
) {}
