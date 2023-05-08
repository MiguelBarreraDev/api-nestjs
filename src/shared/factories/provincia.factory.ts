import { faker } from '@faker-js/faker';

import { Provincia } from 'src/provincia/entities/provincia.entity';

export const provinciaEntity = (params: Partial<Provincia> = {}) => {
  const provincia = new Provincia();
  provincia.fkDepartamento = params?.fkDepartamento || faker.datatype.uuid();
  provincia.provincia = params?.provincia || faker.address.county();
  provincia.creadoEl = params?.creadoEl || faker.date.past();
  provincia.actualizadoEl = params?.actualizadoEl || faker.date.past();
  provincia.eliminadoEl = params?.eliminadoEl || faker.date.past();
  return provincia;
};
