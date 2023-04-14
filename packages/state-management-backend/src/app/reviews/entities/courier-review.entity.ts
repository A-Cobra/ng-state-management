import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Review } from './review.entity';

@Entity()
export class CourierReview {
  @PrimaryKey()
  courierReviewId?: string = v4();

  @Property()
  courierId: string;

  @ManyToOne(() => Review)
  review: Review;
}
