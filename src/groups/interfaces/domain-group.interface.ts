import { UserDomainInterface } from 'src/users/interfaces/user-domain.interface';

/**
 * Used to define the structure of a domain group entity in the application domain.
 */
export interface DomainGroupInterface {
  id: number;
  name: string;
  description: string;
  fkPrecio: number | null;
  fkMedico: number | null;
  fkSucursal: number | null;
  users?: UserDomainInterface[];
}
