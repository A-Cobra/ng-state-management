import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class OrderStatus {
  @PrimaryKey()
  statusId: string = v4();

  @Property()
  name: string;
}
