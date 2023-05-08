import { PayloadDecodeInterface } from './payload.interface';

import { UserDomainInterface } from 'src/users/interfaces/user-domain.interface';

export interface ValidateLocalStrategyInterface {
  payload: PayloadDecodeInterface;
  user: UserDomainInterface;
}
