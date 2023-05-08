import { faker } from '@faker-js/faker';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserAdapter } from './adapter/user.adapter';
import { AuthService } from './auth.service';
import { PayloadDecodeInterface } from './interfaces/payload.interface';
import { ManageSessionCookie } from './utils/manage-session-cookie.util';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthOptimusService } from 'src/shared/services';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('AuthService', () => {
  let service: AuthService;
  let optimusAuthService: AuthOptimusService;

  const usernameMock = faker.internet.userName();
  const passwordMock = faker.internet.password();

  const payloadDecode: PayloadDecodeInterface = {
    groupId: faker.helpers.arrayElement([17, 18]),
    userId: faker.datatype.number(),
    username: faker.internet.userName(),
    fullname: faker.name.fullName(),
  };

  const tokensMock = {
    accessToken: faker.datatype.uuid(),
    refreshToken: faker.datatype.uuid(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        ConfigService,
        AuthService,
        UserAdapter,
        AuthOptimusService,
        OptimusService,
        RolesGuard,
        ManageSessionCookie,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    optimusAuthService = module.get<AuthOptimusService>(AuthOptimusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(service.login).toBeDefined();
    });
    it('should return access and refresh token', () => {
      jest.spyOn(service, 'getTokens').mockReturnValue(tokensMock);

      const result = service.login(payloadDecode);
      expect(result).toEqual(tokensMock);
    });
  });

  describe('validateUser', () => {
    it('should be defined', () => {
      expect(service.validateUser).toBeDefined();
    });

    it('throw UnauthorizedException if password is invalid', () => {
      jest
        .spyOn(optimusAuthService, 'loginCRM')
        .mockRejectedValue(HttpException);

      expect(service.validateUser(usernameMock, passwordMock)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
