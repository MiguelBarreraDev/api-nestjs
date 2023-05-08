import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { UserAdapter } from './adapter/user.adapter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { COOKIE_NAME_FOR_ACCESS_JWT } from './config/constants';
import {
  PayloadDecodeInterface,
  PayloadEncodeInterface,
} from './interfaces/payload.interface';
import { ValidateLocalStrategyInterface } from './interfaces/validate-local-strategy.interface';
import { ManageSessionCookie } from './utils/manage-session-cookie.util';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { userEntity } from 'src/shared/factories';
import { AuthOptimusService } from 'src/shared/services';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

describe('AuthController', () => {
  let configService: ConfigService;
  let controller: AuthController;
  let service: AuthService;
  let userAdapter: UserAdapter;

  const payloadDecode: PayloadDecodeInterface = {
    groupId: faker.helpers.arrayElement([17, 18]),
    userId: faker.datatype.number(),
    username: faker.internet.userName(),
    fullname: faker.name.fullName(),
  };

  const payloadEncode: PayloadEncodeInterface = {
    groupId: faker.helpers.arrayElement([17, 18]),
    sub: faker.datatype.number(),
    username: faker.internet.userName(),
    fullname: faker.name.fullName(),
  };

  const tokensMock = {
    accessToken: faker.datatype.uuid(),
    refreshToken: faker.datatype.uuid(),
  };

  const sendResponseMock = { send: jest.fn() };

  const responseMock = {
    json: jest.fn(),
    cookie: jest.fn(),
    clearCookie: jest.fn(() => sendResponseMock),
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        UserAdapter,
        AuthOptimusService,
        OptimusService,
        RolesGuard,
        ManageSessionCookie,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
    userAdapter = module.get<UserAdapter>(UserAdapter);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(controller.login).toBeDefined();
    });
    it('should return JWT tokens and information of the user', async () => {
      const expirationDate = Date.now() + 1800 * 1000;
      const userMock = userAdapter.fromOptimusToDomain(userEntity());
      const validateLocalStrategy: ValidateLocalStrategyInterface = {
        payload: payloadDecode,
        user: userMock,
      };

      jest.spyOn(service, 'login').mockReturnValue(tokensMock);
      jest.spyOn(configService, 'get').mockReturnValue(1800);

      responseMock.json = jest.fn().mockReturnValue({
        accessToken: tokensMock.accessToken,
        expiresIn: expirationDate,
        user: userMock,
      });

      const result = controller.login(responseMock, validateLocalStrategy);
      expect(service.login).toHaveBeenCalledWith(payloadDecode);
      expect(configService.get).toHaveBeenCalledWith('JWT_ACCESS_EXPIRED');
      expect(result).toEqual(responseMock.json());
    });
  });

  describe('refresh', () => {
    it('should be defined', () => {
      expect(controller.refresh).toBeDefined();
    });
    it('should return new access token', () => {
      jest
        .spyOn(service, 'generateAccessToken')
        .mockReturnValue(tokensMock.accessToken);

      const result = controller.refresh(payloadEncode);
      expect(result).toEqual({
        accessToken: tokensMock.accessToken,
      });
    });
  });

  describe('logout', () => {
    it('should be defined', () => {
      expect(controller.logout).toBeDefined();
    });
    it('should to clear the refreshToken cookie', () => {
      controller.logout(responseMock);
      expect(responseMock.clearCookie).toHaveBeenCalledWith(
        COOKIE_NAME_FOR_ACCESS_JWT,
      );
    });
  });

  describe('profile', () => {
    it('should be defined', () => {
      expect(controller.profile).toBeDefined();
    });
    it('shoudl return the decode payload', async () => {
      const result = controller.profile(payloadDecode);
      expect(result).toEqual(payloadDecode);
    });
  });
});
