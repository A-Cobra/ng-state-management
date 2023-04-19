import { Entity, ManyToOne, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Review } from './review.entity';
import { v4 } from 'uuid';
import { Courier } from '../../couriers/entities/courier.entity';

@Entity()
export class CourierReview {
  @PrimaryKey()
  courierReviewId: string = v4();

  @ManyToOne(() => Courier)
  courier: Courier;

  @OneToOne(() => Review)
  review: Review;
}
