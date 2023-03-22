import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Business_classification {
  @PrimaryKey()
  business_classification_id: string = v4();

  @Property()
  name: string;

  @Property()
  description: string;
}
