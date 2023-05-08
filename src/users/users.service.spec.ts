import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';

import { Group } from 'src/groups/entities/group.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';
import { groupsEntity, userEntity } from 'src/shared/factories';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  const usersMock: User[] = [userEntity()];
  const groupsMock: Group[] = [groupsEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptimusService,
        ConfigService,
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findGroups: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return an empty array if there are no users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(usersMock);

      const result = await service.findAll();
      expect(result).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('throw EntityNotFoundException if user not found', async () => {
      const id = usersMock[0].id;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(service.findOne(id)).rejects.toThrow(EntityNotFoundException);
      expect(service.findOne(id)).rejects.toThrow(
        new EntityNotFoundException(User.name, id.toString()).message,
      );
    });
    it('should return a user', async () => {
      const id = usersMock[0].id;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(usersMock[0]);

      const result = await service.findOne(id);
      expect(result).toEqual(usersMock[0]);
      expect(userRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findGroups', () => {
    it('should be defined', () => {
      expect(service.findGroups).toBeDefined();
    });
    it('should return an emtpy array if there are no groups', async () => {
      const id = usersMock[0].id;

      jest.spyOn(userRepository, 'findGroups').mockResolvedValue([]);

      const result = await service.findGroups(id);
      expect(result).toEqual([]);
    });
    it('should return an array of groups', async () => {
      const id = usersMock[0].id;

      jest.spyOn(userRepository, 'findGroups').mockResolvedValue(groupsMock);

      const result = await service.findGroups(id);
      expect(result).toEqual(groupsMock);
    });
  });
});
