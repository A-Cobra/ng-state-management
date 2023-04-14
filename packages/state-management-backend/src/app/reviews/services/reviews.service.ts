import { Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Review } from '../entities/review.entity';
import { EntityRepository } from '@mikro-orm/core';
import { PaginatedData } from '../interfaces/pagination.interface';
import { ProductReview } from '../entities/product-review.entity';
import { CourierReview } from '../entities/courier-review.entity';
import { CreateCourierReviewDto } from '../dto/create-courier-review';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: EntityRepository<Review>,
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: EntityRepository<ProductReview>,
    @InjectRepository(CourierReview)
    private readonly courierReviewRepository: EntityRepository<CourierReview>
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

  async getCourierReviews(
    page: number,
    limit: number,
    courierId: string
  ): Promise<PaginatedData<Review>> {
    const courierReview = await this.courierReviewRepository.findAndCount(
      { courierId },
      {
        offset: (page - 1) * limit,
        limit,
      }
    );

    const [data, total] = courierReview;

    const reviews = await this.reviewRepository.find(
      data.map((reviewCourier) => reviewCourier.review)
    );

    const totalPages = limit ? Math.ceil(total / limit) : 1;
    return {
      data: reviews,
      currentPage: +page,
      totalItems: total,
      totalPages,
    };
  }

  async createCourierReview(body: CreateCourierReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(body);

    const courierReview = this.courierReviewRepository.create({
      courierId: body.courierId,
      review: review,
    });

    this.reviewRepository.persistAndFlush(review);
    this.courierReviewRepository.persistAndFlush(courierReview);
    return review;
  }
}
