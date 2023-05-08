import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import {
  COOKIE_NAME_FOR_ACCESS_JWT,
  COOKIE_NAME_FOR_REFRESH_JWT,
} from '../config/constants';

@Injectable()
export class ManageSessionCookie {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Generate access token cookie
   * @param res Response object from express
   * @param accessToken Access token
   * @param options Options for cookie (name, sameSite)
   */
  forAccessJwt(
    res: Response,
    accessToken: string,
    options: {
      name?: string;
      sameSite?: boolean | 'lax' | 'strict' | 'none';
    } = {},
  ): number {
    const { name = COOKIE_NAME_FOR_ACCESS_JWT, sameSite = 'lax' } = options;
    const expirationTime = this.configService.get<number>('JWT_ACCESS_EXPIRED');
    const expirationDate = Date.now() + expirationTime * 1000;

    res.cookie(name, accessToken, {
      domain: 'multilab.com.pe',
      httpOnly: true,
      sameSite: sameSite,
      expires: new Date(expirationDate),
    });

    return expirationDate;
  }

  /**
   * Generate refresh token cookie
   * @param res Response object from express
   * @param refreshToken Refresh token
   * @param options Options for cookie (name, sameSite)
   */
  forRefreshJwt(
    res: Response,
    refreshToken: string,
    options: {
      name?: string;
      sameSite?: boolean | 'lax' | 'strict' | 'none';
    } = {},
  ): number {
    const { name = COOKIE_NAME_FOR_REFRESH_JWT, sameSite = 'lax' } = options;
    const expirationTime = this.configService.get<number>(
      'JWT_REFRESH_EXPIRED',
    );
    const expirationDate = Date.now() + expirationTime * 1000;

    res.cookie(name, refreshToken, {
      httpOnly: true,
      sameSite: sameSite,
      expires: new Date(expirationDate),
    });

    return expirationDate;
  }
}
