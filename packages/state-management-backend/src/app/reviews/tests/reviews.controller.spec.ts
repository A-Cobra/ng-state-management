import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Courier } from '../../couriers/entities/courier.entity';
import { ReviewsController } from '../controllers/reviews.controller';
import { CreateCourierReviewDto } from '../dto/create-courier-review.dto';
import { CreateReviewDto } from '../dto/create-product-review.dto';
import { CourierReview } from '../entities/courier-review.entity';
import { ProductReview } from '../entities/product-review.entity';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';
import { CourierReviewsService } from '../services/courier-review.service';
import { ProductReviewsService } from '../services/product-reviews.service';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ProductReviewsService;
  let courierReviewsService: CourierReviewsService;

  const mockReviewRepository = {
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockProductReviewRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockCourierReviewRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockCourierRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ProductReviewsService,
        CourierReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(ProductReview),
          useValue: mockProductReviewRepository,
        },
        {
          provide: getRepositoryToken(CourierReview),
          useValue: mockCourierReviewRepository,
        },
        {
          provide: getRepositoryToken(Courier),
          useValue: mockCourierRepository,
        },
      ],
    }).compile();

    reviewsController = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ProductReviewsService>(ProductReviewsService);
    courierReviewsService = module.get<CourierReviewsService>(
      CourierReviewsService
    );
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
      jest
        .spyOn(reviewsService, 'getProductsReviews')
        .mockResolvedValue(paginatedData);

      const result = await reviewsController.getReviews(productId, page, limit);

      expect(result).toEqual(paginatedData);
      expect(reviewsService.getProductsReviews).toHaveBeenCalledWith(
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
        comment: createReviewDto.comment,
      };
      jest
        .spyOn(reviewsService, 'createProductReview')
        .mockResolvedValue(review);

      const result = await reviewsController.createReview(
        createReviewDto,
        productId
      );

      expect(result).toEqual(review);
      expect(reviewsService.createProductReview).toHaveBeenCalledWith({
        ...createReviewDto,
        productId,
      });
    });
  });

  describe('getCourierReviews', () => {
    it('should return paginated courier reviews', async () => {
      const courierId = 'courier-id';
      const page = 1;
      const limit = 10;
      const reviews: Review[] = [];
      const paginatedData: PaginatedData<Review> = {
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      };
      jest
        .spyOn(courierReviewsService, 'getCourierReviews')
        .mockResolvedValue(paginatedData);

      const result = await reviewsController.getCourierReviews(
        courierId,
        page,
        limit
      );

      expect(result).toEqual(paginatedData);
      expect(courierReviewsService.getCourierReviews).toHaveBeenCalledWith(
        page,
        limit,
        courierId
      );
    });
  });

  describe('createCourierReview', () => {
    it('should create a new courier review', async () => {
      const courierId = 'courier-id';
      const createReviewDto: CreateCourierReviewDto = {
        customerId: 'customer-id',
        comment: 'review comment',
      };
      const review: Review = {
        reviewId: 'review-id',
        customerId: createReviewDto.customerId,
        comment: createReviewDto.comment,
      };

      jest
        .spyOn(courierReviewsService, 'createCourierReview')
        .mockResolvedValue(review);

      const result = await reviewsController.createCourierReview(
        createReviewDto,
        courierId
      );

      expect(result).toEqual(review);
      expect(courierReviewsService.createCourierReview).toHaveBeenCalledWith({
        ...createReviewDto,
        courierId: courierId,
      });
    });
  });
});
