import { PrimaryKey, Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Product } from '../../products/entities/product.entity';
import { Review } from './review.entity';

@Entity()
export class ProductReview {
  @PrimaryKey()
  productReviewId: string = v4();

  @ManyToOne(() => Product)
  product: Product;

  @OneToOne(() => Review, (review) => review.reviewId)
  review: Review;
}
