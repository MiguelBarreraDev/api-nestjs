import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GroupAdapter } from './adapters/group.adapter';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupRepository } from './repositories/group.repository';

import { UserAdapter } from 'src/auth/adapter/user.adapter';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

@Module({
  controllers: [GroupsController],
  providers: [
    ConfigService,
    GroupsService,
    GroupRepository,
    OptimusService,
    GroupAdapter,
    UserAdapter,
  ],
})
export class GroupsModule {}
