import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { userEntity } from '../shared/factories/user.factory';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Group } from 'src/groups/entities/group.entity';
import { groupsEntity } from 'src/shared/factories';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const userMock: User[] = [userEntity()];
  const groupsMock: Group[] = [groupsEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        OptimusService,
        ConfigService,
        UsersService,
        { provide: UserRepository, useClass: Repository },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty array if there are no users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(userMock);

      const result = await controller.findAll();
      expect(result).toEqual(userMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return an user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(userMock[0]);
      const result = await controller.findOne(userMock[0].id);
      expect(result).toEqual(userMock[0]);
    });
  });

  describe('findGroups', () => {
    it('should be defined', () => {
      expect(controller.findGroups).toBeDefined();
    });
    it('should return an empty array if there are no groups', async () => {
      jest.spyOn(service, 'findGroups').mockResolvedValue([]);
      const result = await controller.findGroups(userMock[0].id);
      expect(result).toEqual([]);
    });
    it('should return an array of groups', async () => {
      jest.spyOn(service, 'findGroups').mockResolvedValue(groupsMock);

      const result = await controller.findGroups(userMock[0].id);
      expect(result).toEqual(groupsMock);
      expect(service.findGroups).toHaveBeenCalledWith(userMock[0].id);
    });
  });
});
