import { Injectable } from '@nestjs/common';

import { Group } from '../entities/group.entity';

import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

@Injectable()
export class GroupRepository {
  constructor(private readonly optimusService: OptimusService) {}

  /**
   * Get all groups
   * @returns Groups
   */
  async findAll(): Promise<Group[]> {
    const serviceResponse = await this.optimusService.get('/groups');
    return serviceResponse.data;
  }

  /**
   * Get one group
   * @param id Group id
   * @returns Group
   */
  async findOne(id: number): Promise<Group> {
    const serviceResponse = await this.optimusService.get(`/groups/${id}`);
    return serviceResponse.data;
  }

  /**
   * Get a group by id with the users that belong to it
   * @param groupId Group id
   * @returns Group with users that belong to it
   */
  async users(groupId: number): Promise<Group> {
    const serviceResponse = await this.optimusService.get(
      `/groups/${groupId}/users`,
    );
    return serviceResponse.data;
  }
}
