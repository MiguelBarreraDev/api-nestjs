import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, MaxLength } from 'class-validator';

export class CreateVisitaMedicaDto {
  @ApiProperty({
    description: 'Fecha de la visita médica',
    format: 'date-time',
  })
  @IsDateString()
  fecha: string;

  @ApiProperty({
    description: 'Comentario sobre la visita médica',
    required: false,
  })
  @MaxLength(450)
  comentario?: string;

  @ApiProperty({
    description: 'Fecha de la proxima visita médica',
    required: false,
    format: 'date-time',
  })
  @IsDateString()
  proximaFecha?: string;

  @ApiProperty({
    description: 'Proximo paso respecto a la visita médica',
    required: false,
  })
  @MaxLength(450)
  proximoPaso?: string;

  @ApiProperty({ description: 'Usuario que registró la visita médica' })
  @IsNumber()
  fkUsuario: number;

  @ApiProperty({ description: 'Médico asociado a la visita médica' })
  @MaxLength(25)
  fkMedico: string;
}
