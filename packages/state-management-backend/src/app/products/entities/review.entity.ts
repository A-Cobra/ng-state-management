import { Property, PrimaryKey, Entity } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Review {
  @PrimaryKey()
  reviewId: string = v4();

  @Property()
  productId: string;

  @Property()
  customerId: string;

  @Property()
  comment: string;
}
