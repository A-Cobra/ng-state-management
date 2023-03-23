import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Business_HQ } from '../../business/entities/business.entity';

@Entity()
export class BusinessBranch {
  @PrimaryKey()
  branchId: string = v4();

  @Property()
  name: string;

  @Property()
  address: string;

  @Property()
  image: string;

  @Property()
  longitude: string;

  @Property()
  latitude: string;

  @Property({ type: 'time' })
  openingTime: string;

  @Property({ type: 'time' })
  closeTime: string;

  @Property()
  contactEmail: string;

  @Property()
  contactPhoneNumber: string;

  @Property({ type: 'boolean', default: false, hidden: true })
  deleted = false;

  @ManyToOne(() => Business_HQ)
  businessId: Business_HQ;
}
