import { ProductReview } from './product-review.entity';
import { Property, PrimaryKey, Entity, OneToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Review {
  @PrimaryKey()
  reviewId: string = v4();

  @Property()
  customerId: string;

  @Property()
  comment: string;

  @OneToOne(() => ProductReview, (productReview) => productReview.review)
  productReviews: ProductReview;
}
