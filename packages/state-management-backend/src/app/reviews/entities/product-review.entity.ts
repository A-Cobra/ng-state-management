import { Property, PrimaryKey, Entity, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Review } from './review.entity';

@Entity()
export class ProductReview {
  @PrimaryKey()
  productReviewId?: string = v4();

  @Property()
  productId: string;

  @ManyToOne(() => Review)
  review: Review;
}
