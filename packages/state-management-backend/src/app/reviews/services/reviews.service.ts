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
    private readonly reviewRepository: EntityRepository<Review>,
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: EntityRepository<ProductReview>
  ) {}

  async getProductsReviews(
    page: number,
    limit: number,
    productId: string
  ): Promise<PaginatedData<Review>> {
    const productsReviews = await this.productReviewRepository.findAndCount(
      { productId },
      {
        offset: (page - 1) * limit,
        limit,
      }
    );

    const [data, total] = productsReviews;

    const reviews = await this.reviewRepository.find(
      data.map((productReview) => productReview.review)
    );

    const totalPages = limit ? Math.ceil(total / limit) : 1;
    return {
      data: reviews,
      currentPage: +page,
      totalItems: total,
      totalPages,
    };
  }

  async createProductReview(body: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(body);

    const productReview = this.productReviewRepository.create({
      productId: body.productId,
      review: review,
    });

    this.reviewRepository.persistAndFlush(review);
    this.productReviewRepository.persistAndFlush(productReview);
    return review;
  }
}
