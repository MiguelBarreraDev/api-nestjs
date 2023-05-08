import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @Get(':id/groups')
  findGroups(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findGroups(id);
  }
}
