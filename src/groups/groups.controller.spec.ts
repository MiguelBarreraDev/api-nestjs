import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { GroupAdapter } from './adapters/group.adapter';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupRepository } from './repositories/group.repository';

import { UserAdapter } from 'src/auth/adapter/user.adapter';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        ConfigService,
        GroupsService,
        GroupRepository,
        OptimusService,
        GroupAdapter,
        UserAdapter,
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
