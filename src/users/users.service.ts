import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

import { Group } from 'src/groups/entities/group.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Obtiene todos los usuarios registrados en la base de datos
   * @returns Lista de Usuarios
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Obtiene un Usuario por su Id
   * @param id - Id del usuario
   * @returns Un usuario
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new EntityNotFoundException(User.name, id.toString());
    }

    return user;
  }

  /**
   * Obtiene los grupos de un usuario por su Id
   * @param id - Id del usuario
   * @returns Lista dde grupos a los que pertenece el usuario
   */
  async findGroups(id: number): Promise<Group[]> {
    const user = await this.userRepository.findGroups(id);

    if (!user) {
      throw new EntityNotFoundException(User.name, id.toString());
    }

    return user;
  }
}
