import { User } from 'src/users/entities/user.entity';

export class Group {
  id: number;
  name: string;
  description: string;
  fkPrecio: number | null;
  fkMedico: number | null;
  fkSucursal: number | null;
  users?: User[];
  creadoEl: Date;
  actualizadoEl: Date | null;
  eliminadoEl: Date | null;
}
