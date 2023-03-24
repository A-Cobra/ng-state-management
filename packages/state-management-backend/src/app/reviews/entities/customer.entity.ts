import { Property, PrimaryKey, Entity } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Customer {
  @PrimaryKey()
  customerId: string = v4();

  @Property()
  userId: string;

  @Property()
  addressId: string;
}
