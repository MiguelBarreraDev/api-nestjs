import { faker } from '@faker-js/faker';

import { Tareas } from 'src/tareas/entities/tareas.entity';

export const tareasEntity = (params: Partial<Tareas> = {}): Tareas => {
  const tareas = new Tareas();
  tareas.pkTarea = params.pkTarea || faker.datatype.uuid();
  tareas.pkTmp = params.pkTmp || faker.datatype.number();
  tareas.tarea = params.tarea || faker.lorem.sentence();
  tareas.fkCategoria = params.fkCategoria || faker.datatype.number();
  tareas.fkUsuarioAsignador =
    params.fkUsuarioAsignador || faker.datatype.number();
  tareas.fkUsuarioEjecutor =
    params.fkUsuarioEjecutor || faker.datatype.number();
  tareas.estatus = params.estatus || faker.datatype.number();
  tareas.comentario = params.comentario || faker.lorem.sentences();
  tareas.fechaProgramada =
    params.fechaProgramada || new Date(faker.date.future());
  tareas.creadoEl = params.creadoEl || new Date(faker.date.past());
  tareas.actualizadoEl = params.actualizadoEl || new Date(faker.date.past());
  tareas.eliminadoEl =
    params.eliminadoEl ||
    faker.helpers.arrayElement([null, new Date(faker.date.past())]);

  return tareas;
};
