import { Test } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';
import { EntityRepository } from '@mikro-orm/core';

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
    it('should return an array of reviews', async () => {
      const data: Review[] = [
        { reviewId: '1', productId: '1', comment: 'test', customerId: '1' },
      ];
      const paginatedData: PaginatedData = {
        data,
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
      };

      jest
        .spyOn(productsService, 'getReviews')
        .mockImplementation(async () => await paginatedData);

      expect(await productsController.getReviews('1', 1, 1)).toBe(
        paginatedData
      );
    });
  });
});
