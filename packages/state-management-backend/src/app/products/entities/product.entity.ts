import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ProductInterface } from '@state-management-app/types';

@Entity()
export class Product implements ProductInterface {
  @PrimaryKey()
  idProduct: string = v4();

  @Property()
  productName: string;

  @Property()
  description: string;

  @Property()
  price: number;

  @Property()
  discount: number;

  @Property()
  stock: number;

  @Property()
  status: string;
}
