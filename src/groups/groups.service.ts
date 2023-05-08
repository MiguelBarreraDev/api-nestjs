import { Injectable } from '@nestjs/common';

import { GroupAdapter } from './adapters/group.adapter';
import { DomainGroupInterface } from './interfaces/domain-group.interface';
import { GroupRepository } from './repositories/group.repository';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupAdapter: GroupAdapter,
  ) {}

  /**
   * Find all groups
   * @returns Groups
   */
  async findAll(): Promise<DomainGroupInterface[]> {
    const groups = await this.groupRepository.findAll();
    return this.groupAdapter.fromOptimusArrayToDomain(groups);
  }

  /**
   * Find one group by id
   * @param id Group id
   * @returns Group
   */
  async findOne(id: number): Promise<DomainGroupInterface> {
    const group = await this.groupRepository.findOne(id);
    return this.groupAdapter.fromOptimusToDomain(group);
  }

  /**
   * Find a group by id with the users that belong to it
   * @param id Group id
   * @returns Group with users that belong to it
   */
  async users(id: number): Promise<DomainGroupInterface> {
    const group = await this.groupRepository.users(id);
    return this.groupAdapter.fromOptimusToDomain(group);
  }
}
