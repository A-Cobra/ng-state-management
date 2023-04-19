import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CouriersService } from '../../couriers/services/couriers.service';
import { CreateCourierReviewDto } from '../dto/create-courier-review.dto';
import { CourierReview } from '../entities/courier-review.entity';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';

@Injectable()
export class CourierReviewsService {
  constructor(
    @InjectRepository(CourierReview)
    private readonly courierReviewRepository: EntityRepository<CourierReview>,
    @InjectRepository(Review)
    private readonly reviewRepository: EntityRepository<Review>,
    private readonly courierService: CouriersService
  ) {}

  async getCourierReviews(
    page: number,
    limit: number,
    courierId: string
  ): Promise<PaginatedData<Review>> {
    const courier = await this.courierService.findById(courierId);
    const courierReview = await this.courierReviewRepository.findAndCount(
      {
        courier,
      },
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
    const courier = await this.courierService.findById(body.courierId);
    const review = this.reviewRepository.create(body);

    const courierReview = this.courierReviewRepository.create({
      courier: courier,
      review: review,
    });

    this.reviewRepository.persistAndFlush(review);
    this.courierReviewRepository.persistAndFlush(courierReview);
    return review;
  }
}
