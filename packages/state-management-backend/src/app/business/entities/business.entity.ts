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
import { Business_classification } from './business_classification.entity';

@Entity()
export class Business_HQ {
  @PrimaryKey()
  business_id: string = v4();

  @Property()
  busines_name: string;

  @Property()
  business_picture: string;

  @Property()
  rating: number;

  @Property()
  contact_email: string;

  @Property()
  contact_phone_number: string;

  @Property()
  longitude: string;

  @Property()
  latitude: string;

  @Property()
  contact_address: string;

  @Property()
  approved_registration?: boolean;

  @ManyToMany(() => Business_classification)
  classifications: Collection<Business_classification> =
    new Collection<Business_classification>(this);

  @OneToOne()
  user: User;
}
