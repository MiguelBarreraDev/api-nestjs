import { Injectable } from '@nestjs/common';

import { OptimusService } from './optimus.service';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthOptimusService {
  constructor(private optimusService: OptimusService) {}

  /**
   * Login en el CRM
   * @param username - usuario
   * @param password - contraseña
   * @returns Información de un usuario
   */
  async loginCRM(username: string, password: string): Promise<User> {
    const data = {
      username,
      password,
    };

    const loginCrmResponse = await this.optimusService.post(
      '/auth/login-crm',
      data,
    );

    return loginCrmResponse.data;
  }
}
