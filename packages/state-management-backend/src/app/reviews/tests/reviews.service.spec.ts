import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Review } from '../entities/review.entity';
import { ProductReview } from '../entities/product-review.entity';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Collection } from '@mikro-orm/core';

describe('ReviewsService', () => {
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

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getReviews', () => {
    it('should return a paginated list of reviews for a given product', async () => {
      const mockReviews = [{}, {}];
      const mockTotalCount = mockReviews.length;
      const limit = 10;
      const currentPage = 1;
      const productId = '123';
      mockReviewRepository.findAndCount.mockResolvedValueOnce([
        mockReviews,
        mockTotalCount,
      ]);

      const result = await reviewsService.getReviews(
        currentPage,
        limit,
        productId
      );

      expect(mockReviewRepository.findAndCount).toHaveBeenCalledWith(
        { productId },
        {
          offset: 0,
          limit,
        }
      );
      expect(result).toEqual({
        data: mockReviews,
        currentPage,
        totalItems: mockTotalCount,
        totalPages: Math.ceil(mockTotalCount / limit),
      });
    });
  });

  describe('createReview', () => {
    it('should create a new review and product review and return the review', async () => {
      const mockCreateReviewDto: CreateReviewDto = {
        customerId: '123',
        productId: '456',
        comment: 'Test comment',
      };
      const mockReview: Review = {
        customerId: '123',
        productId: '456',
        comment: 'Test comment',
        reviewId: '789',
        productReviews: new Collection<ProductReview>(this),
      };
      mockReviewRepository.create.mockReturnValueOnce(mockReview);
      const mockProductReview = { productId: '456', reviewId: mockReview };
      mockProductReviewRepository.create.mockReturnValueOnce(mockProductReview);

      const result = await reviewsService.createReview(mockCreateReviewDto);

      expect(mockReviewRepository.create).toHaveBeenCalledWith(
        mockCreateReviewDto
      );
      expect(mockProductReviewRepository.create).toHaveBeenCalledWith({
        productId: '456',
        reviewId: mockReview,
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
});
