import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ProductReview } from './product-review.entity';

@Entity()
export class Review {
  @PrimaryKey()
  reviewId: string = v4();

  @Property()
  customerId: string;

  @Property()
  comment: string;
}
