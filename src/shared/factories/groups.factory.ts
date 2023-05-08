import { faker } from '@faker-js/faker';

import { Group } from 'src/groups/entities/group.entity';

export const groupsEntity = (params: Partial<Group> = {}): Group => {
  const groups = new Group();
  groups.id = params.id ?? faker.datatype.number();
  groups.name = params.name ?? faker.lorem.word();
  groups.description = params.description ?? faker.lorem.words(3);
  groups.fkPrecio = params.fkPrecio ?? faker.datatype.number();
  groups.fkMedico = params.fkMedico ?? faker.datatype.number();
  groups.fkSucursal = params.fkSucursal ?? faker.datatype.number();
  groups.creadoEl = params.creadoEl ?? faker.date.past();
  groups.actualizadoEl = params.actualizadoEl ?? faker.date.past();
  groups.eliminadoEl = params.eliminadoEl ?? faker.date.past();
  return groups;
};
