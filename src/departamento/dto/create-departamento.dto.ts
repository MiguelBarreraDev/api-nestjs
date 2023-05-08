import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty({
    description: 'Nombre del departamento',
  })
  @MaxLength(45)
  departamento: string;
}
