import {
  Collection,
  Entity,
  ManyToMany,
  OneToOne,
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
  businesName: string;

  @Property()
  businessPicture: string;

  @Property({ nullable: true })
  rating?: number;

  @Property()
  contactEmail: string;

  @Property()
  contactPhoneNumber: string;

  @Property()
  longitude: string;

  @Property()
  latitude: string;

  @Property()
  contactAddress: string;

  @Property({ default: false })
  approvedRegistration?: boolean;

  @Property({ default: false })
  deleted?: boolean;

  @ManyToMany(() => BusinessClassification)
  classifications?: Collection<BusinessClassification> =
    new Collection<BusinessClassification>(this);
}
