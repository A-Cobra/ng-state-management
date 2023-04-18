import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { BusinessClassification } from './business-classification.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { v4 } from 'uuid';

@Entity()
export class BusinessHq extends User {
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

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.businesses,
    { hidden: true }
  )
  categories = new Collection<ProductCategory>(this);
}
