import { Test } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { ProductsController } from '../controllers/products.controller';
import { Review } from '../entities/review.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateReviewDto } from '../dto/create-review.dto';

describe('Products controller', () => {
  let productsService: ProductsService;
  let productsController: ProductsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: 'ReviewRepository',
          useClass: EntityRepository,
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
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

      jest.spyOn(productsService, 'getReviews').mockResolvedValueOnce({
        data: reviews,
        currentPage: page,
        totalItems: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      });

      const result = await productsService.getReviews({
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
      expect(productsService.getReviews).toHaveBeenCalledWith({
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
        .spyOn(productsService, 'createReview')
        .mockResolvedValueOnce(review);

      await productsController.createReview(reviewDto, productId);

      expect(createReviewSpy).toHaveBeenCalledWith({ ...reviewDto, productId });
    });
    it('should return the created review', async () => {
      jest.spyOn(productsService, 'createReview').mockResolvedValueOnce(review);

      const result = await productsController.createReview(
        reviewDto,
        productId
      );

      expect(result).toEqual(review);
    });
  });
});
