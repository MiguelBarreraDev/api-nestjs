import { faker } from '@faker-js/faker';

import { VisitaMedica } from 'src/visita-medica/entities/visita-medica.entity';

export const visitaMedicaEntity = (
  params: Partial<VisitaMedica> = {},
): VisitaMedica => {
  const visitaMedica = new VisitaMedica();
  visitaMedica.pkVisitaMedica = params.pkVisitaMedica || faker.datatype.uuid();
  visitaMedica.pkTmp = params.pkTmp || faker.datatype.number({ min: 1 });
  visitaMedica.fecha = params.fecha || faker.date.future();
  visitaMedica.comentario = params.comentario || faker.lorem.words(5);
  visitaMedica.proximaFecha = params.proximaFecha || faker.date.future();
  visitaMedica.proximoPaso = params.proximoPaso || faker.lorem.words(5);
  visitaMedica.fkUsuario =
    params.fkUsuario || faker.datatype.number({ min: 1 });
  visitaMedica.fkMedico = params.fkMedico || faker.lorem.word();
  visitaMedica.creadoEl = params.creadoEl || faker.date.past();
  visitaMedica.actualizadoEl = params.actualizadoEl || faker.date.past();
  visitaMedica.eliminadoEl = params.eliminadoEl || null;

  return visitaMedica;
};
