import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { BusinessHq } from '../../business/entities/business.entity';
import { Courier } from '../../couriers/entities/courier.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { OrderStatus } from './order-status.entity';

@Entity()
export class Order {
  @PrimaryKey()
  idOrder: string = v4();

  @Property()
  placedAt: Date = new Date();

  @Property()
  confirmationCode: string;

  @Property({ onUpdate: () => new Date() })
  modifiedAt = new Date();

  @Property({ type: 'decimal' })
  courierTip: number;

  @Property({ type: 'decimal' })
  subTotal: number;

  @Property({ type: 'decimal' })
  total: number;

  @Property({ type: 'string' })
  notes: string;

  @Property({ type: 'string' })
  shippingAddress: string;

  @OneToOne(() => OrderStatus, (orderStatus) => orderStatus.idStatus)
  status: OrderStatus;

  @ManyToOne(() => Courier)
  courier: Courier;

  @OneToOne(() => Payment, (payment) => payment.idPayment)
  payment: Payment;

  @ManyToOne(() => Customer)
  customer: Customer;

  @OneToOne(() => BusinessHq, (business) => business.businessId)
  business: Payment;
}
