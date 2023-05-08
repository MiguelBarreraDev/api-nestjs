import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { GroupAdapter } from './adapters/group.adapter';
import { GroupsService } from './groups.service';
import { GroupRepository } from './repositories/group.repository';

import { UserAdapter } from 'src/auth/adapter/user.adapter';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        GroupsService,
        GroupRepository,
        OptimusService,
        GroupAdapter,
        UserAdapter,
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
