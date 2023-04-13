import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { BusinessHq } from './business.entity';

@Entity()
export class BusinessClassification {
  @PrimaryKey()
  businessClassificationId: string = v4();

  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ default: false })
  deleted?: boolean;

  @ManyToMany(() => BusinessHq, (business) => business.classifications, {
    hidden: true,
  })
  businessess = new Collection<BusinessHq>(this);
}
