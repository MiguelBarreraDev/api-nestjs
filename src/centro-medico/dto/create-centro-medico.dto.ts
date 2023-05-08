import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class CreateCentroMedicoDto {
  @ApiProperty({
    name: 'centroMedico',
    description: 'Nombre del centro médico',
  })
  @MaxLength(150)
  readonly centroMedico: string;

  @ApiProperty({
    name: 'fkTipoCentroMedico',
    description: 'Identificador del tipo de centro médico',
  })
  @IsOptional()
  readonly fkTipoCentroMedico?: number;

  @ApiProperty({
    name: 'direccion',
    description: 'Dirección del centro médico',
  })
  @IsOptional()
  @MaxLength(100)
  readonly direccion?: string;

  @ApiProperty({
    name: 'potencial',
    description: 'Potencial del centro médico',
  })
  @MaxLength(45)
  @IsOptional()
  readonly potencial?: string;

  @ApiProperty({
    name: 'detalle',
    description: 'Detalle del centro médico',
  })
  @MaxLength(100)
  @IsOptional()
  readonly detalle?: string;

  @ApiProperty({
    name: 'fkDepartamento',
    description: 'Identificador del departamento',
  })
  @IsOptional()
  readonly fkDepartamento?: number;

  @ApiProperty({
    name: 'fkProvincia',
    description: 'Indetificador de la provincia',
  })
  @IsOptional()
  readonly fkProvincia?: number;

  @ApiProperty({
    name: 'fkDistrito',
    description: 'Identificador del distrito',
  })
  @IsOptional()
  readonly fkDistrito?: number;

  @ApiProperty({
    name: 'referencia',
    description: 'Referencia del centro médico',
  })
  @MaxLength(100)
  @IsOptional()
  readonly referencia?: string;

  @ApiProperty({
    name: 'telefono',
    description: 'Teléfono del centro médico',
  })
  @MaxLength(50)
  @IsOptional()
  readonly telefono?: string;
}
