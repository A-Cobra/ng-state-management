import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Review } from '../entities/review.entity';
import { EntityRepository } from '@mikro-orm/core';
import { PaginatedData } from '../interfaces/pagination.interface';
import { ProductReview } from '../entities/product-review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRespository: EntityRepository<Review>,
    @InjectRepository(ProductReview)
    private readonly productReviewRespository: EntityRepository<ProductReview>
  ) {}

  async getReviews({
    page,
    limit,
    productId,
  }): Promise<PaginatedData<Review>> {
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

    const productReview = this.productReviewRespository.create({
      productId: body.productId,
      reviewId: review,
    });

    this.reviewRespository.persistAndFlush(review);
    this.productReviewRespository.persistAndFlush(productReview);
    return review;
  }
}
