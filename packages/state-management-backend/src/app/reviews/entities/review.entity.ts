import { ProductReview } from './product-review.entity';
import {
  Property,
  PrimaryKey,
  Entity,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { CourierReview } from './courier-review.entity';

@Entity()
export class Review {
  @PrimaryKey()
  reviewId: string = v4();

  @Property()
  customerId: string;

  @Property()
  comment: string;

  @OneToMany(() => ProductReview, (productReview) => productReview.review)
  productReviews? = new Collection<ProductReview>(this);

  @OneToMany(() => CourierReview, (courierReview) => courierReview.review)
  courierReviews? = new Collection<CourierReview>(this);
}
