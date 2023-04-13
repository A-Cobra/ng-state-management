import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryKey()
  idProduct: string = v4();

  @Property({ type: 'string', length: 50 })
  productName: string;

  @Property({ type: 'string', length: 150 })
  description: string;

  @Property({ type: 'decimal' })
  price: number;

  @Property({ type: 'decimal' })
  discount: number;

  @Property({ type: 'int' })
  stock: number;

  @Property({ type: 'string', length: 25 })
  status: string;
}
