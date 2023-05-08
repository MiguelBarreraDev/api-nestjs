import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  PayloadDecodeInterface,
  PayloadEncodeInterface,
} from '../interfaces/payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_KEY'),
    });
  }

  async validate(
    payload: PayloadEncodeInterface,
  ): Promise<PayloadDecodeInterface> {
    return {
      userId: payload.sub,
      username: payload.username,
      fullname: payload.fullname,
      groupId: payload.groupId,
    };
  }

  static extractFromCookie(req: Request) {
    return req?.cookies?.refreshToken;
  }
}
