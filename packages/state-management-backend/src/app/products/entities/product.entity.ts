import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ProductInterface } from '@state-management-app/types';

@Entity()
export class Product implements ProductInterface {
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
