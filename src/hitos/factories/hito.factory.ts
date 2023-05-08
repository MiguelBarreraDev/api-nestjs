import { faker } from '@faker-js/faker';

import { Hito } from 'src/hitos/entities/hito.entity';

export const hitoEntity = (params: Partial<Hito> = {}): Hito => {
  const hito = new Hito();
  hito.pkHito = params.pkHito || faker.datatype.uuid();
  hito.pkTmp = params.pkTmp || faker.datatype.number();
  hito.hito = params.hito || faker.lorem.words();
  hito.metrica = params.metrica || faker.datatype.number();
  hito.estado = params.estado || faker.datatype.number();
  hito.grupo = params.grupo || faker.lorem.word();
  hito.icono = params.icono || faker.lorem.word();
  hito.color = params.color || faker.internet.color();
  hito.creadoEl = params.creadoEl || new Date(faker.date.past());
  hito.actualizadoEl = params.actualizadoEl || new Date(faker.date.past());
  hito.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return hito;
};
