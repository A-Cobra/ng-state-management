import { Collection } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateReviewDto } from '../dto/create-review.dto';
import { CourierReview } from '../entities/courier-review.entity';
import { ProductReview } from '../entities/product-review.entity';
import { Review } from '../entities/review.entity';
import { ReviewsService } from '../services/reviews.service';
import { CreateCourierReviewDto } from '../dto/create-courier-review';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;

  const mockReviewRepository = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  const mockProductReviewRepository = {
    findAndCount: jest.fn(),
    persistAndFlush: jest.fn(),
    create: jest.fn(),
  };
  const mockCourierReviewRepository = {
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        {
          provide: getRepositoryToken(CourierReview),
          useValue: mockCourierReviewRepository,
        },
      ],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getProductsReviews', () => {
    it('should return paginated reviews for a given product ID', async () => {
      const productId = '123';
      const page = 1;
      const limit = 10;
      const review: Review = {
        reviewId: '1',
        comment: 'Review 1',
        customerId: '1',
        productReviews: new Collection<ProductReview>(this),
      };

      const productsReviews: ProductReview[] = [{ productId, review }];

      const reviews = [review];

      mockProductReviewRepository.findAndCount.mockResolvedValueOnce([
        productsReviews,
        productsReviews.length,
      ]);

      mockReviewRepository.find.mockResolvedValueOnce(reviews);

      const result = await reviewsService.getProductsReviews(
        page,
        limit,
        productId
      );

      expect(mockProductReviewRepository.findAndCount).toHaveBeenCalledWith(
        { productId },
        {
          offset: (page - 1) * limit,
          limit,
        }
      );

      expect(mockReviewRepository.find).toHaveBeenCalledWith(reviews);

      expect(result).toEqual({
        data: reviews,
        currentPage: page,
        totalItems: productsReviews.length,
        totalPages: limit ? Math.ceil(productsReviews.length / limit) : 1,
      });
    });
  });

  describe('createProductReview', () => {
    it('should create a new review and product review and return the review', async () => {
      const mockCreateReviewDto: CreateReviewDto = {
        customerId: '123',
        productId: '456',
        comment: 'Test comment',
      };
      const mockReview: Review = {
        customerId: '123',
        comment: 'Test comment',
        reviewId: '789',
        productReviews: new Collection<ProductReview>(this),
      };
      mockReviewRepository.create.mockReturnValueOnce(mockReview);
      const mockProductReview: ProductReview = {
        productId: '456',
        review: mockReview,
      };
      mockProductReviewRepository.create.mockReturnValueOnce(mockProductReview);

      const result = await reviewsService.createProductReview(
        mockCreateReviewDto
      );

      expect(mockReviewRepository.create).toHaveBeenCalledWith(
        mockCreateReviewDto
      );
      expect(mockProductReviewRepository.create).toHaveBeenCalledWith({
        productId: '456',
        review: mockReview,
      });
      expect(mockReviewRepository.persistAndFlush).toHaveBeenCalledWith(
        mockReview
      );
      expect(mockProductReviewRepository.persistAndFlush).toHaveBeenCalledWith(
        mockProductReview
      );
      expect(result).toEqual(mockReview);
    });
  });

  describe('getCourierReviews', () => {
    it('should return a paginated list of courier reviews', async () => {
      const courierId = '123';
      const limit = 2;
      const reviews: Review[] = [
        {
          reviewId: '1',
          comment: 'Great courier!',
          customerId: 'customer-id',
        },
        {
          reviewId: '2',
          comment: 'Fast delivery',
          customerId: 'customer-id',
        },
        {
          reviewId: '3',
          comment: 'Bad experience',
          customerId: 'customer-id',
        },
      ];
      const courierReviews: CourierReview[] = [
        {
          courierId: courierId,
          review: reviews[0],
        },
        {
          courierId: courierId,
          review: reviews[1],
        },
        {
          courierId: '456',
          review: reviews[2],
        },
      ];

      jest
        .spyOn(mockCourierReviewRepository, 'findAndCount')
        .mockResolvedValueOnce([
          courierReviews.filter((cr) => cr.courierId === courierId),
          2,
        ]);
      jest
        .spyOn(mockReviewRepository, 'find')
        .mockResolvedValueOnce([reviews[0], reviews[1]]);

      const result = await reviewsService.getCourierReviews(
        1,
        limit,
        courierId
      );

      expect(mockCourierReviewRepository.findAndCount).toHaveBeenCalledWith(
        { courierId },
        { offset: 0, limit: limit }
      );
      expect(mockReviewRepository.find).toHaveBeenCalledWith([
        reviews[0],
        reviews[1],
      ]);
      expect(result).toEqual({
        data: [reviews[0], reviews[1]],
        currentPage: 1,
        totalItems: 2,
        totalPages: 1,
      });
    });

    it('should return an empty list if there are no reviews for the courier', async () => {
      const page = 1;
      const limit = 10;
      const courierId = '1';

      jest
        .spyOn(mockCourierReviewRepository, 'findAndCount')
        .mockResolvedValueOnce([[], 0]);

      jest.spyOn(mockReviewRepository, 'find').mockResolvedValueOnce([]);

      const result = await reviewsService.getCourierReviews(
        page,
        limit,
        courierId
      );

      expect(mockCourierReviewRepository.findAndCount).toBeCalledWith(
        { courierId },
        { offset: 0, limit: 10 }
      );
      expect(result).toEqual({
        data: [],
        currentPage: page,
        totalItems: 0,
        totalPages: 0,
      });
    });
  });

  describe('createCourierReview', () => {
    it('should create a new courier review', async () => {
      const customerId = 'cusomter-id';
      const courierId = 'courier-id';
      const comment = 'Great service!';
      const createCourierReviewDto: CreateCourierReviewDto = {
        customerId,
        courierId,
        comment,
      };

      const reviewId = 'review-id';
      const review = {
        reviewId,
        customerId,
        comment,
        productReviews: [],
        courierReviews: [
          {
            courierId,
          },
        ],
      };

      mockReviewRepository.create.mockReturnValueOnce(review);
      mockCourierReviewRepository.create.mockReturnValueOnce({
        courierId,
        review,
      });

      const result = await reviewsService.createCourierReview(
        createCourierReviewDto
      );

      expect(mockReviewRepository.create).toHaveBeenCalledWith(
        createCourierReviewDto
      );
      expect(mockCourierReviewRepository.create).toHaveBeenCalledWith({
        courierId,
        review,
      });
      expect(mockReviewRepository.persistAndFlush).toHaveBeenCalledTimes(1);
      expect(mockCourierReviewRepository.persistAndFlush).toHaveBeenCalledTimes(
        1
      );
      expect(result).toEqual(review);
    });
  });
});
