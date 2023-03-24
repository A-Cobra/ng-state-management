import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';
import { ReviewsController } from '../controllers/reviews.controller';
import { Collection } from '@mikro-orm/core';
import { ProductReview } from '../entities/product-review.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;

  const mockReviewRepository = {
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockProductReviewRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(ProductReview),
          useValue: mockProductReviewRepository,
        },
      ],
    }).compile();

    reviewsController = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  describe('getReviews', () => {
    it('should return paginated reviews', async () => {
      const productId = 'product-id';
      const page = 1;
      const limit = 10;
      const reviews: Review[] = [];
      const paginatedData: PaginatedData<Review> = {
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      };
      jest.spyOn(reviewsService, 'getReviews').mockResolvedValue(paginatedData);

      const result = await reviewsController.getReviews(productId, page, limit);

      expect(result).toEqual(paginatedData);
      expect(reviewsService.getReviews).toHaveBeenCalledWith(
        page,
        limit,
        productId
      );
    });
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const productId = 'product-id';
      const createReviewDto: CreateReviewDto = {
        customerId: 'customer-id',
        comment: 'review comment',
      };
      const review: Review = {
        reviewId: 'review-id',
        customerId: createReviewDto.customerId,
        productId,
        comment: createReviewDto.comment,
        productReviews: new Collection<ProductReview>(this),
      };
      jest.spyOn(reviewsService, 'createReview').mockResolvedValue(review);

      const result = await reviewsController.createReview(
        createReviewDto,
        productId
      );

      expect(result).toEqual(review);
      expect(reviewsService.createReview).toHaveBeenCalledWith({
        ...createReviewDto,
        productId,
      });
    });
  });
});
