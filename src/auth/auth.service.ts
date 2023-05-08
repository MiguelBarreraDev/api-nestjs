import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserAdapter } from './adapter/user.adapter';
import {
  PayloadDecodeInterface,
  PayloadEncodeInterface,
} from './interfaces/payload.interface';

import { AuthOptimusService } from 'src/shared/services';
import { User } from 'src/users/entities/user.entity';
import { UserDomainInterface } from 'src/users/interfaces/user-domain.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userAdapter: UserAdapter,
    private optimusAuthService: AuthOptimusService,
  ) {}

  private logger = new Logger(AuthService.name);

  /**
   * Genera access and refresh token para authenticar y persistir sesion
   * @param user - credenciales de un usuario
   * @returns access_token and refresh_token
   */
  login(payload: PayloadDecodeInterface) {
    const { userId, ...rest } = payload;
    return this.getTokens({ ...rest, sub: userId });
  }

  /**
   * Valida la identidad de un usuario con las credenciales proporcionadas
   * @param username - usuario
   * @param pass - contraseña
   * @returns Información de un usuario
   */
  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserDomainInterface> {
    let loginCrmResponse: User;

    try {
      loginCrmResponse = await this.optimusAuthService.loginCRM(username, pass);
    } catch (err) {
      this.logger.log(err);
      throw new UnauthorizedException('Crendentials incorrect');
    }

    return this.userAdapter.fromOptimusToDomain(loginCrmResponse);
  }

  /**
   * Genera access_token y refresh_token para solicitar un nuevo access_token
   * @param payload - Carga util para la generacion del token
   * @returns access token and refresh token
   */
  getTokens(payload: PayloadEncodeInterface) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  /**
   * Genera token de acceso
   * @param payload - Carga util para la generacion del token
   * @returns access token
   */
  generateAccessToken(payload: PayloadEncodeInterface) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_KEY'),
      expiresIn: +this.configService.get('JWT_ACCESS_EXPIRED'),
    });
  }
  /**
   * Genera token de refresco
   * @param payload - carga util para la generacion del token
   * @returns refresh token
   */
  generateRefreshToken(payload: PayloadEncodeInterface) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_KEY'),
      expiresIn: +this.configService.get('JWT_REFRESH_EXPIRED'),
    });
  }
}
