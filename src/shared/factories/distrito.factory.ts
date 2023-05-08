import { faker } from '@faker-js/faker';

import { Distrito } from 'src/distrito/entities/distrito.entity';

export const distritoEntity = (params: Partial<Distrito> = {}): Distrito => {
  const distrito = new Distrito();
  distrito.pkDistrito = params.pkDistrito || faker.datatype.uuid();
  distrito.fkProvincia = params.fkProvincia || faker.datatype.number();
  distrito.distrito = params.distrito || faker.address.cityName();
  distrito.creadoEl = params.creadoEl || faker.date.past();
  distrito.actualizadoEl = params.actualizadoEl || faker.date.past();
  distrito.eliminadoEl = params.eliminadoEl || faker.date.past();
  distrito.autoService =
    params.autoService || faker.datatype.number({ max: 32767 });
  distrito.ubigeo = params.ubigeo || faker.address.zipCode();
  return distrito;
};
