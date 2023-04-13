import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Payment {
  @PrimaryKey()
  idPayment: string = v4();

  @Property({ type: 'string', length: 100 })
  fullName: string;

  @Property({ type: 'boolean', default: false })
  isDefault: boolean;

  @Property({ type: 'string', length: 25 })
  cardNumber: string;

  @Property({ type: 'string', length: 10 })
  expirationDate: string;

  @Property({ type: 'string', length: 5 })
  cvv: string;

  @ManyToOne(() => Customer)
  customer: Customer;
}
