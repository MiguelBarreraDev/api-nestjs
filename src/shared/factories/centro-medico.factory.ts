import { faker } from '@faker-js/faker';

import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';

export const centroMedicoEntity = (
  params: Partial<CentroMedico> = {},
): CentroMedico => {
  const centroMedico = new CentroMedico();
  centroMedico.pkCentroMedico = params.pkCentroMedico || faker.datatype.uuid();
  centroMedico.pkTmp = params.pkTmp || faker.random.alphaNumeric(25);
  centroMedico.centroMedico = params.centroMedico || faker.company.name();
  centroMedico.fkTipoCentroMedico =
    params.fkTipoCentroMedico || faker.datatype.number();
  centroMedico.direccion = params.direccion || faker.address.streetAddress();
  centroMedico.potencial = params.potencial || faker.lorem.word();
  centroMedico.detalle = params.detalle || faker.lorem.sentence();
  centroMedico.fkDepartamento =
    params.fkDepartamento || faker.datatype.number();
  centroMedico.fkProvincia = params.fkProvincia || faker.datatype.number();
  centroMedico.fkDistrito = params.fkDistrito || faker.datatype.number();
  centroMedico.referencia = params.referencia || faker.lorem.sentence();
  centroMedico.telefono = params.telefono || faker.phone.number();
  centroMedico.creadoEl = params.creadoEl || faker.date.past();
  centroMedico.actualizadoEl = params.actualizadoEl || faker.date.past();
  centroMedico.eliminadoEl =
    params.eliminadoEl || faker.helpers.arrayElement([faker.date.past(), null]);

  return centroMedico;
};
