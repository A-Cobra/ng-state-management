import {
  Collection,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { Review } from './review.entity';
import { v4 } from 'uuid';
import { Courier } from '../../courier/entities/courier.entity';

@Entity()
export class CourierReview {
  @PrimaryKey()
  idCourierReview: string = v4();

  @ManyToOne(() => Courier)
  courier: Courier;

  @OneToOne(() => Review, (review) => review.reviewId)
  review = new Collection<Review>(this);
}
