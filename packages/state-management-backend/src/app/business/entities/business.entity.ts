import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';

import { v4 } from 'uuid';
import { Payroll } from '../../payroll/entities/payroll.entity';
import { User } from '../../users/entities/user.entity';
import { BusinessClassification } from './business-classification.entity';
import { ProductCategory } from '../../products/entities/product-category.entity';

@Entity()
export class BusinessHq extends User {
  @PrimaryKey()
  businessId: string = v4();

  @Property({ type: 'string', length: 50 })
  businessName: string;

  @Property({ type: 'string', length: 50 })
  businessPicture: string;

  @Property({ nullable: true })
  rating?: number;

  @Property({ type: 'string', length: 20 })
  longitude: string;

  @Property({ type: 'string', length: 20 })
  latitude: string;

  @Property({ type: 'string', length: 100 })
  contactAddress: string;

  @Property({ default: false })
  approvedRegistration?: boolean;

  @OneToOne({ nullable: true })
  payroll?: Payroll;

  @Property({ default: false })
  deleted?: boolean;

  @ManyToMany(() => BusinessClassification)
  classifications?: Collection<BusinessClassification> =
    new Collection<BusinessClassification>(this);

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.businesses,
    { hidden: true }
  )
  categories = new Collection<ProductCategory>(this);
}
