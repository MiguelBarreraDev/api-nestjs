import { Injectable, Logger } from '@nestjs/common';

import { User } from '../entities/user.entity';

import { Group } from 'src/groups/entities/group.entity';
import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

@Injectable()
export class UserRepository {
  logger = new Logger(UserRepository.name);

  constructor(private readonly optimusService: OptimusService) {}

  /**
   * Obtiene todos los usuarios
   * @returns Lista de usuarios
   */
  async find(): Promise<User[]> {
    try {
      const serviceResponse = await this.optimusService.get('/users');
      return serviceResponse.data;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  /**
   * Obtiene un usuario por su id
   * @param id - Id del usuario
   * @returns Un usuario
   */
  async findOne(id: number): Promise<User> {
    try {
      const serviceResponse = await this.optimusService.get(`/users/${id}`);
      return serviceResponse.data;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  /**
   * Obtiene los grupos de un usuario
   * @param id - Id del usuario
   * @returns Lista de grupos a los que pertenece el usuario
   */
  async findGroups(id: number): Promise<Group[]> {
    try {
      const serviceResponse = await this.optimusService.get(
        `/users/${id}/groups`,
      );
      return serviceResponse.data;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
