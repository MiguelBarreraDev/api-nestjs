import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserAdapter } from './adapter/user.adapter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ManageSessionCookie } from './utils/manage-session-cookie.util';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthOptimusService } from 'src/shared/services';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

@Module({
  imports: [JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    UserAdapter,
    AuthOptimusService,
    OptimusService,
    RolesGuard,
    ManageSessionCookie,
  ],
})
export class AuthModule {}
