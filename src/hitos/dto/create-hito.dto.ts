import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateHitoDto {
  @ApiProperty({ name: 'hito', description: 'Nombre del hito' })
  @MaxLength(100)
  hito: string;

  @ApiProperty({ name: 'metrica', required: false })
  @IsOptional()
  @IsNumber()
  metrica?: number;

  @ApiProperty({ name: 'estado', default: 1 })
  @IsNumber()
  estado: number;

  @ApiProperty({ name: 'grupo' })
  @MaxLength(100)
  grupo: string;

  @ApiProperty({ name: 'icono' })
  @MaxLength(50)
  icono: string;

  @ApiProperty({ name: 'color', required: false })
  @IsOptional()
  @MaxLength(7)
  color?: string;
}
