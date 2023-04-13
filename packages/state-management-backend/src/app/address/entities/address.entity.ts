import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Address {
  @PrimaryKey()
  idAddress: string = v4();

  @Property()
  tagName: string;

  @Property()
  address: string;

  @Property()
  latitude: string;

  @Property()
  longitude: string;

  @Property()
  notes: string;
}
