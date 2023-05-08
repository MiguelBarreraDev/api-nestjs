import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { ValidateLocalStrategyInterface } from '../interfaces/validate-local-strategy.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<ValidateLocalStrategyInterface> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      payload: {
        username: user.username,
        fullname: `${user.firstname} ${user.lastname}`,
        groupId: user.groupId,
        userId: user.id,
      },
      user: user,
    };
  }
}
