import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({
    description: 'Query to search',
    required: true,
  })
  @IsString()
  readonly query: string;

  @ApiProperty({
    description: 'Number of items to take',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly take?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly skip?: number;
}
