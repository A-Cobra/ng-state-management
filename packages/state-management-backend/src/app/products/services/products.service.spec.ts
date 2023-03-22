import { EntityRepository } from '@mikro-orm/core';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ProductsService } from './products.service';
import { Review } from '../entities/review.entity';
import { Test, TestingModule } from '@nestjs/testing';
describe('ProductsService', () => {
  let service: ProductsService;
  let reviewRepository: EntityRepository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'ReviewRepository',
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    reviewRepository = module.get<EntityRepository<Review>>('ReviewRepository');
  });

  describe('getReviews', () => {
    it('should return paginated reviews for a given product', async () => {
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
      jest
        .spyOn(reviewRepository, 'findAndCount')
        .mockResolvedValueOnce([reviews, reviews.length]);

      const result = await service.getReviews({ page, limit, productId });

      expect(result).toEqual({
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: 1,
      });
      expect(reviewRepository.findAndCount).toHaveBeenCalledWith(
        { productId },
        { offset: 0, limit: 10 }
      );
    });
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const reviewDto: CreateReviewDto = {
        customerId: '1',
        productId: '1',
        comment: 'Nice product',
      };
      const review: Review = {
        reviewId: '1',
        customerId: '1',
        productId: '1',
        comment: 'Nice product',
      };
      jest.spyOn(reviewRepository, 'create').mockReturnValueOnce(review);
      jest
        .spyOn(reviewRepository, 'persistAndFlush')
        .mockResolvedValueOnce(undefined);

      const result = await service.createReview(reviewDto);

      expect(result).toEqual(review);
      expect(reviewRepository.create).toHaveBeenCalledWith(reviewDto);
      expect(reviewRepository.persistAndFlush).toHaveBeenCalledWith(review);
    });
  });
});
