# Unitest

### Testear un servicio que dependende de un repository
```ts
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: jest.fn(() => ({
            find: jest.fn().mockResolvedValue(mockUsers),
          })),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userService.findAll();
      expect(result).toEqual(mockUsers);
    });
  });
});
```

### Testear un servicio que depende de un repository, pero con el uso de jest.spyOn para definir el mock para el método
```ts
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const result = await userService.findAll();
      expect(result).toEqual(mockUsers);
    });
  });
});
```

### Testear un servicio que depende de un repository, usando jest.spyOn para definir el mock para el método del repositorio en cada descripción de cada prueba
```ts
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const result = await userService.findAll();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const mockUser: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      const result = await userService.findOne(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockUser: User = { name: 'John Doe', email: 'john.doe@example.com' };
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
      const result = await userService.create(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});
```