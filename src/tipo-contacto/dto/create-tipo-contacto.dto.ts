import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateTipoContactoDto {
  @ApiProperty({ description: 'Nombre del tipo de contacto', required: true })
  @MaxLength(100)
  @IsNotEmpty()
  tipoContacto: string;

  @ApiProperty({ description: 'Orden del tipo de contacto', required: false })
  @IsNumber()
  orden?: number;

  @ApiProperty({
    description: 'Define si se muestra el tipo de contacto',
    required: false,
    default: 1,
  })
  @IsNumber()
  mostrar?: number;

  @ApiProperty({ description: 'Icono del tipo de contacto', required: false })
  @MaxLength(50)
  @IsNotEmpty()
  icon?: string;
}
