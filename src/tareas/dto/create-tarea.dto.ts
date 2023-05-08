import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateTareaDto {
  @ApiProperty({
    description: 'Nombre de la tarea',
    required: true,
  })
  @MaxLength(300)
  @IsNotEmpty()
  tarea: string;

  @ApiProperty({
    description: 'Id de la categoría a la que pertenece a la tarea',
    required: true,
  })
  @IsNumber()
  fkCategoria: number;

  @ApiProperty({
    description: 'Id del usuario que asigna la tarea',
    required: true,
  })
  @IsNumber()
  fkUsuarioAsignador: number;

  @ApiProperty({
    description: 'Id del usuario que ejecutará la tarea',
    required: true,
  })
  @IsNumber()
  fkUsuarioEjecutor: number;

  @ApiProperty({
    description: 'Estado de la tarea',
    default: 0,
    required: false,
  })
  @IsNumber()
  estatus?: number;

  @ApiProperty({
    description: 'Comentario sobre la tarea',
    required: false,
  })
  @MaxLength(255)
  comentario?: string;

  @ApiProperty({
    description: 'Fecha programada para la tarea',
    required: false,
    format: 'date-time',
  })
  @IsDateString()
  fechaProgramada?: string;
}
