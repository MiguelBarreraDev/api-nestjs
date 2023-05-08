import {
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { COOKIE_NAME_FOR_ACCESS_JWT } from './config/constants';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtRefreshAuthGuard } from './guards';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import {
  PayloadDecodeInterface,
  PayloadEncodeInterface,
} from './interfaces/payload.interface';
import { ValidateLocalStrategyInterface } from './interfaces/validate-local-strategy.interface';
import { ManageSessionCookie } from './utils/manage-session-cookie.util';

import { Payload } from 'src/shared/decorators';
import { ToPayloadDecodePipe } from 'src/shared/pipes';

@ApiTags('Authentication')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private manageSessionCookie: ManageSessionCookie,
  ) {}

  @ApiBody({ type: LoginAuthDto, description: 'User credentials' })
  @ApiResponse({ status: 200, description: 'Authenticated user' })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  login(
    @Res() res: Response,
    @Payload() validateLocalStrategy: ValidateLocalStrategyInterface,
  ) {
    const { accessToken } = this.authService.login(
      validateLocalStrategy.payload,
    );

    const expirationDate = this.manageSessionCookie.forAccessJwt(
      res,
      accessToken,
    );

    return res.json({
      accessToken: accessToken,
      expiresIn: expirationDate,
      user: validateLocalStrategy.user,
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @ApiResponse({ status: 200, description: 'New access token' })
  @Get('refresh')
  refresh(@Payload() payload: PayloadEncodeInterface) {
    return {
      accessToken: this.authService.generateAccessToken(payload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'User session terminated' })
  @Get('logout')
  logout(@Res() res: Response) {
    return res.clearCookie(COOKIE_NAME_FOR_ACCESS_JWT).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'User profile' })
  @Get('profile')
  profile(@Payload(ToPayloadDecodePipe) payload: PayloadDecodeInterface) {
    return payload;
  }
}
