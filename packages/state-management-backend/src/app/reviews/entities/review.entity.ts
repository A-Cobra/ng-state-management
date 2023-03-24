import { ProductReview } from './product-review.entity';
import {
  Property,
  PrimaryKey,
  Entity,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Review {
  @PrimaryKey()
  reviewId: string = v4();

  @Property()
  customerId: string;

  @Property()
  productId: string;

  @Property()
  comment: string;

  @OneToMany(() => ProductReview, (productReview) => productReview.reviewId)
  productReviews = new Collection<ProductReview>(this);
}
