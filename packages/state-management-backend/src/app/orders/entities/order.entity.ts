import {
  Collection,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Courier } from '../../courier/entities/courier.entity';
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

  @Property()
  courierTip: number;

  @Property()
  subTotal: number;

  @Property()
  total: number;

  @Property()
  notes: string;

  @Property()
  shippingAddress: string;

  @OneToOne(() => OrderStatus, (orderStatus) => orderStatus.idStatus)
  status = new Collection<OrderStatus>(this);

  @ManyToOne()
  idCourier: string;

  @OneToOne()
  idPayment: string;

  @ManyToOne()
  idCustomer: string;

  @OneToOne()
  BusinessId: string;
}
