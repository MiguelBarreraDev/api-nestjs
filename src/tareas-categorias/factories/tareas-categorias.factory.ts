import { faker } from '@faker-js/faker';

import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

export const tareasCategoriasEntity = (
  params: Partial<TareasCategorias> = {},
): TareasCategorias => {
  const tareasCategorias = new TareasCategorias();
  tareasCategorias.pkTareasCategoria =
    params.pkTareasCategoria || faker.datatype.uuid();
  tareasCategorias.pkTmp = params.pkTmp || faker.datatype.number();
  tareasCategorias.categoria = params.categoria || faker.lorem.words();
  tareasCategorias.creadoEl = params.creadoEl || new Date(faker.date.past());
  tareasCategorias.actualizadoEl =
    params.actualizadoEl || new Date(faker.date.past());
  tareasCategorias.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return tareasCategorias;
};
