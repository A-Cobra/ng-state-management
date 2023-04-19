import { Address } from '../address';
import { UserInterface } from '../users';

export interface CustomerInterface extends UserInterface {
  customerId: string;
  address: Address;
}
