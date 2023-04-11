import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class OrderStatus {
  @PrimaryKey()
  idStatus: string = v4();

  @Property()
  name: string;
}
