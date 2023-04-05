import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../users/entities/user.entity';
import { BusinessClassification } from './business-classification.entity';

@Entity()
export class BusinessHq extends User {
  @PrimaryKey()
  businessId: string = v4();

  @Property()
  businessName: string;

  @Property({ nullable: true })
  rating?: number;

  @Property()
  longitude: string;

  @Property()
  latitude: string;

  @Property()
  contactAddress: string;

  @Property({ default: false })
  approvedRegistration?: boolean;

  @ManyToMany(() => BusinessClassification)
  classifications?: Collection<BusinessClassification> =
    new Collection<BusinessClassification>(this);
}
