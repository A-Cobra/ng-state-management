import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Product {
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
