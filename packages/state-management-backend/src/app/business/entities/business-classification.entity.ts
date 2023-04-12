import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class BusinessClassification {
  @PrimaryKey()
  businessClassificationId: string = v4();

  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ default: false })
  deleted?: boolean;
}
