import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GroupsService } from './groups.service';

import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { groups } from 'src/shared/constants';
import { AllowedRoles } from 'src/shared/decorators';

@ApiTags('Groups')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@AllowedRoles(groups.VISITADOR_ADMIN_ID)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/users')
  users(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.users(id);
  }
}
