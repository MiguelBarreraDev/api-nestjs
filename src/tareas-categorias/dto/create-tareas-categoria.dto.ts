import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateTareasCategoriaDto {
  @ApiProperty({
    name: 'categoria',
    description: 'Nombre de la categoría',
    required: true,
  })
  @MaxLength(255)
  categoria: string;
}
