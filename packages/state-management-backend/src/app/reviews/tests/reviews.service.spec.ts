import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Collection } from '@mikro-orm/core';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../entities/review.entity';
import { ProductReview } from '../entities/product-review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Product } from '../../products/entities/product.entity';

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
    jest.resetAllMocks();
  });

  describe('getProductsReviews', () => {
    it('should return paginated reviews for a given product ID', async () => {
      const product: Product = {
        idProduct: '123',
        productName: 'test',
        description: 'test',
        price: 0,
        discount: 0,
        stock: 0,
        status: '',
      };
      const page = 1;
      const limit = 10;
      const review: Review = {
        reviewId: '1',
        comment: 'Review 1',
        customerId: '1',
        productReviews: new Collection<ProductReview>(this),
      };

      const productsReviews: ProductReview[] = [
        { product, review, productReviewId: 'uuid' },
      ];

      const reviews = [review];

      mockProductReviewRepository.findAndCount.mockResolvedValueOnce([
        productsReviews,
        productsReviews.length,
      ]);

      mockReviewRepository.find.mockResolvedValueOnce(reviews);

      const result = await reviewsService.getProductsReviews(
        page,
        limit,
        product.idProduct
      );

      expect(mockProductReviewRepository.findAndCount).toHaveBeenCalledWith(
        {
          product: {
            idProduct: '123',
          },
        },
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
        productId: '123',
        comment: 'Test comment',
      };
      const mockReview: Review = {
        customerId: '123',
        comment: 'Test comment',
        reviewId: '789',
        productReviews: new Collection<ProductReview>(this),
      };
      mockReviewRepository.create.mockReturnValueOnce(mockReview);
      const product: Product = {
        idProduct: '123',
        productName: 'test',
        description: 'test',
        price: 0,
        discount: 0,
        stock: 0,
        status: '',
      };
      const mockProductReview: ProductReview = {
        product,
        review: mockReview,
        productReviewId: 'uuid',
      };
      mockProductReviewRepository.create.mockReturnValueOnce(mockProductReview);

      const result = await reviewsService.createProductReview(
        mockCreateReviewDto
      );

      expect(mockReviewRepository.create).toHaveBeenCalledWith(
        mockCreateReviewDto
      );
      expect(mockProductReviewRepository.create).toHaveBeenCalledWith({
        product: {
          idProduct: '123',
        },
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
});
