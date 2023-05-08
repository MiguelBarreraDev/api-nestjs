import { Injectable } from '@nestjs/common';

import { Group } from '../entities/group.entity';
import { DomainGroupInterface } from '../interfaces/domain-group.interface';

import { UserAdapter } from 'src/auth/adapter/user.adapter';

@Injectable()
export class GroupAdapter {
  constructor(private readonly userAdapter: UserAdapter) {}

  /**
   * Convert a group from Optimus to a group in the application domain
   * @param group Group from Optimus
   * @returns Group in the application domain
   */
  fromOptimusToDomain(group: Group): DomainGroupInterface {
    const formatedGroup = {
      id: group.id,
      name: group.name,
      description: group.description,
      fkPrecio: group.fkPrecio,
      fkMedico: group.fkMedico,
      fkSucursal: group.fkSucursal,
    };

    if (!group?.users) {
      return formatedGroup;
    }

    const users = this.userAdapter.fromOptimusArray(group.users);

    return { ...formatedGroup, users };
  }

  /**
   * Convert an array of groups from Optimus to an array of groups in the application domain
   * @param groups Groups array from Optimus
   * @returns Groups in the application domain
   */
  fromOptimusArrayToDomain(groups: Group[]): DomainGroupInterface[] {
    return groups.map((group) => this.fromOptimusToDomain(group));
  }
}
