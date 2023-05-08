import { faker } from '@faker-js/faker';

import { TipoContacto } from 'src/tipo-contacto/entities/tipo-contacto.entity';

export const tipoContactoEntity = (
  params: Partial<TipoContacto> = {},
): TipoContacto => {
  const tipoContacto = new TipoContacto();
  tipoContacto.pkTipoContacto = params.pkTipoContacto || faker.datatype.uuid();
  tipoContacto.pkTmp = params.pkTmp || faker.datatype.number();
  tipoContacto.tipoContacto = params.tipoContacto || faker.lorem.word();
  tipoContacto.orden = params.orden || faker.datatype.number();
  tipoContacto.mostrar = params.mostrar || faker.datatype.number();
  tipoContacto.icon = params.icon || faker.random.word();
  tipoContacto.creadoEl = params.creadoEl || new Date(faker.date.past());
  tipoContacto.actualizadoEl =
    params.actualizadoEl || new Date(faker.date.past());
  tipoContacto.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return tipoContacto;
};
