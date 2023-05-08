import { faker } from '@faker-js/faker';

import { Departamento } from 'src/departamento/entities/departamento.entity';

export const departamentoEntity = (
  params: Partial<Departamento> = {},
): Departamento => {
  const departamento = new Departamento();
  departamento.pkDepartamento = params.pkDepartamento ?? faker.datatype.uuid();
  departamento.pkTmp = params.pkTmp ?? faker.datatype.number();
  departamento.departamento = params.departamento ?? faker.lorem.words();
  departamento.creadoEl = params.creadoEl ?? new Date(faker.date.past());
  departamento.actualizadoEl =
    params.actualizadoEl ?? new Date(faker.date.past());
  departamento.eliminadoEl =
    params.eliminadoEl ??
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return departamento;
};
