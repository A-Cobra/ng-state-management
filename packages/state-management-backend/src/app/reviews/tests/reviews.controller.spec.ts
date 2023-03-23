import { Test } from '@nestjs/testing';
import { Review } from '../entities/review.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsController } from '../controllers/reviews.controller';

describe('Products controller', () => {
  let reviewsService: ReviewsService;
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        {
          provide: 'ReviewRepository',
          useClass: EntityRepository,
        },
      ],
    }).compile();

    reviewsService = moduleRef.get<ReviewsService>(ReviewsService);
    reviewsController = moduleRef.get<ReviewsController>(ReviewsController);
  });

  describe('getReviews', () => {
    it('should return a PaginatedData object.', async () => {
      const page = 1;
      const limit = 10;
      const productId = 1;
      const reviews: Review[] = [
        {
          reviewId: '1',
          productId: '1',
          customerId: '1',
          comment: 'Great product',
        },
      ];

      jest.spyOn(reviewsService, 'getReviews').mockResolvedValueOnce({
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      });

      const result = await reviewsService.getReviews({
        page,
        limit,
        productId,
      });

      expect(result).toEqual({
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      });
      expect(result.data).toEqual(reviews);
      expect(reviewsService.getReviews).toHaveBeenCalledWith({
        page,
        limit,
        productId,
      });
    });
  });

  describe('createReview', () => {
    const productId = '12345';
    const reviewDto: CreateReviewDto = {
      customerId: '123',
      comment: 'Great product',
    };
    const review: Review = {
      reviewId: 'abc123',
      ...reviewDto,
      productId,
    };

    it('should call productsService.createReview with correct arguments', async () => {
      const createReviewSpy = jest
        .spyOn(reviewsService, 'createReview')
        .mockResolvedValueOnce(review);

      await reviewsController.createReview(reviewDto, productId);

      expect(createReviewSpy).toHaveBeenCalledWith({ ...reviewDto, productId });
    });
    it('should return the created review', async () => {
      jest.spyOn(reviewsService, 'createReview').mockResolvedValueOnce(review);

      const result = await reviewsController.createReview(reviewDto, productId);

      expect(result).toEqual(review);
    });
  });
});
