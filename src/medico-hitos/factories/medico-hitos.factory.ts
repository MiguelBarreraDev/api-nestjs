import { faker } from '@faker-js/faker';

import { MedicoHitos } from 'src/medico-hitos/entities/medico-hitos.entity';

export const medicoHitoEntity = (
  params: Partial<MedicoHitos> = {},
): MedicoHitos => {
  const medicoHito = new MedicoHitos();
  medicoHito.pkMedicoHito = params.pkMedicoHito || faker.datatype.uuid();
  medicoHito.fkMedico = params.fkMedico || faker.datatype.uuid();
  medicoHito.fkHito = params.fkHito || faker.datatype.number();
  medicoHito.fecha = params.fecha || new Date(faker.date.past());
  medicoHito.creadoEl = params.creadoEl || new Date(faker.date.past());
  medicoHito.actualizadoEl =
    params.actualizadoEl || new Date(faker.date.past());
  medicoHito.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return medicoHito;
};
