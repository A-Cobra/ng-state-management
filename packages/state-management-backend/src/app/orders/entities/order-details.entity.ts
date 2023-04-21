import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryKey()
  orderId: string = v4();

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;
}
