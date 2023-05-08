import { faker } from '@faker-js/faker';

import { HitosContacto } from 'src/hitos-contacto/entities/hitos-contacto.entity';

export const hitosContactoEntity = (
  params: Partial<HitosContacto> = {},
): HitosContacto => {
  const hitosContacto = new HitosContacto();
  hitosContacto.pkHitoContacto = params.pkHitoContacto || faker.datatype.uuid();
  hitosContacto.fkHito = params.fkHito || faker.datatype.number();
  hitosContacto.fkTipoContacto =
    params.fkTipoContacto || faker.datatype.number();
  hitosContacto.fkUser = params.fkUser || faker.datatype.number();
  hitosContacto.fkMedico = params.fkMedico || faker.datatype.number();
  hitosContacto.creadoEl = params.creadoEl || new Date(faker.date.past());
  hitosContacto.actualizadoEl =
    params.actualizadoEl || new Date(faker.date.past());
  hitosContacto.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return hitosContacto;
};
