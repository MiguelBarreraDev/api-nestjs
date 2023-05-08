import { Injectable } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { UserDomainInterface } from 'src/users/interfaces/user-domain.interface';

@Injectable()
export class UserAdapter {
  /**
   * Convert a user from Optimus to a user in the application domain
   * @param user User from Optimus
   * @returns User in the application domain
   */
  fromOptimusToDomain(user: User): UserDomainInterface {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      phone: user.phone,
      gender: user.sexo,
      foto: user.foto,
      birthday: user.fechaBirthday,
      groupId: user.groupId,
    };
  }

  /**
   * Convert an array of users from Optimus to an array of users in the application domain
   * @param users Users array from Optimus
   * @returns Users in the application domain
   */
  fromOptimusArray(users: User[]): UserDomainInterface[] {
    return users.map((user) => this.fromOptimusToDomain(user));
  }
}
