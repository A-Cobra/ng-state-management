import { Entity, ManyToOne, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Review } from './review.entity';
import { v4 } from 'uuid';
import { BusinessBranch } from '../../branches/entities/business-branch.entity';

@Entity()
export class BusinessBranchReview {
  @PrimaryKey()
  idBranchReview: string = v4();

  @ManyToOne(() => BusinessBranch)
  businessbranch: BusinessBranch;

  @OneToOne(() => Review, (review) => review.reviewId)
  review: Review;
}
