import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Username of the user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
