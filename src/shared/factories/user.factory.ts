import { faker } from '@faker-js/faker';

import { User } from 'src/users/entities/user.entity';

export const userEntity = (params: Partial<User> = {}): User => {
  const user = new User();
  user.id = params.id || faker.datatype.number();
  user.ipAddress = params.ipAddress || faker.internet.ip();
  user.username = params.username || faker.internet.userName();
  user.email = params.email || faker.internet.email();
  user.activationCode = params.activationCode || faker.datatype.uuid();
  user.forgottenPasswordCode =
    params.forgottenPasswordCode || faker.datatype.uuid();
  user.forgottenPasswordTime =
    params.forgottenPasswordTime || faker.date.recent().getTime();
  user.rememberCode = params.rememberCode || faker.datatype.uuid();
  user.createdOn = params.createdOn || faker.date.past().getTime();
  user.lastLogin = params.lastLogin || faker.date.recent().getTime();
  user.active = params.active || faker.datatype.number(1);
  user.firstName = params.firstName || faker.name.firstName();
  user.lastName = params.lastName || faker.name.lastName();
  user.company = params.company || faker.company.name();
  user.phone = params.phone || faker.phone.number();
  user.creadoEl = params.creadoEl || faker.date.past();
  user.actualizadoEl = params.actualizadoEl || faker.date.recent();
  user.eliminadoEl = params.eliminadoEl || faker.date.recent();
  user.verResultados = params.verResultados || faker.datatype.boolean();
  user.admin = params.admin || faker.datatype.boolean();
  user.idCargo = params.idCargo || faker.datatype.boolean();
  user.updatedAt = params.updatedAt || faker.date.recent();
  user.rememberToken = params.rememberToken || faker.datatype.uuid();
  user.tipoPrecio = params.tipoPrecio || faker.random.word();
  user.comments = params.comments || faker.random.words();
  user.sexo = params.sexo || faker.helpers.arrayElement(['M', 'F', 'O']);
  user.foto = params.foto || faker.image.imageUrl();
  user.reset = params.reset || faker.datatype.number(1);
  user.menuPerfilId = params.menuPerfilId || faker.datatype.number();
  user.fechaBirthday =
    params.fechaBirthday || faker.date.past().toISOString().substring(0, 10);
  user.fechaMultilab =
    params.fechaMultilab || faker.date.recent().toISOString().substring(0, 10);
  return user;
};
