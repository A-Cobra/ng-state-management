import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Review } from '../entities/review.entity';
import { EntityRepository } from '@mikro-orm/core';
import { PaginatedData } from '../interfaces/pagination.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRespository: EntityRepository<Review>
  ) {}

  async getReviews({ page, limit, productId }): Promise<PaginatedData> {
    const reviews = await this.reviewRespository.findAndCount(
      { productId },
      {
        offset: (page - 1) * limit,
        limit,
      }
    );

    const [data, total] = reviews;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      currentPage: page,
      totalItems: total,
      totalPages,
    };
  }

  async createReview(body: CreateReviewDto): Promise<Review> {
    const review = this.reviewRespository.create(body);
    this.reviewRespository.persistAndFlush(review);
    return review;
  }
}
