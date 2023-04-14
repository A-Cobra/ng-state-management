import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { v4 } from 'uuid';
@Entity()
export class Customer extends User {
  @PrimaryKey()
  idCustomer: string = v4();
  @OneToOne(() => Address)
  address: Address;
}
