import { Test } from '@nestjs/testing';
import { ProductCategoryController } from '../controllers/product-category.controller';
import { ProductCategoryService } from '../services/product-category.service';
import {
  categorySearch,
  singleCategory,
  categoryUpdated,
  newCategoryMock,
} from './product-category.stub';
import { PaginationResult } from '@state-management-app/types';
import { ProductCategory } from '../entities/product-category.entity';
import { BusinessService } from '../../business/services/business.service';
import { EntityRepository } from '@mikro-orm/core';
import { BusinessHq } from '../../business/entities/business.entity';
import { businessStub } from '../../business/tests/business.stubs';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';

describe('ProductCategoryController', () => {
  let productCategoryController: ProductCategoryController;
  let productCategoryService: ProductCategoryService;
  const userId: JwtInfo = { exp: 1, iat: 1, sub: '1', role: 'business' };
  beforeEach(async () => {
    const mockBusinessService = {
      findById: jest
        .fn()
        .mockImplementation(() => Promise.resolve(businessStub as BusinessHq)),
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [
        ProductCategoryService,
        {
          provide: BusinessService,
          useValue: mockBusinessService,
        },
        {
          provide: 'ProductCategoryRepository',
          useClass: EntityRepository<ProductCategory>,
        },
      ],
    }).compile();

    productCategoryService = moduleRef.get<ProductCategoryService>(
      ProductCategoryService
    );
    productCategoryController = moduleRef.get<ProductCategoryController>(
      ProductCategoryController
    );
  });

  describe('Search categories', () => {
    it('should return category by name', async () => {
      const result = categorySearch;
      jest
        .spyOn(productCategoryService, 'search')
        .mockImplementation(
          () =>
            Promise.resolve(result) as Promise<
              PaginationResult<ProductCategory>
            >
        );
      const paginationDto = { page: 1, limit: 10 };
      const name = 'Category 1';
      const search = await productCategoryController.getAll(
        paginationDto,
        userId,
        name
      );
      expect(search.data[0].name).toEqual(name);
    });
  });

  describe('Get category by id', () => {
    it('should return category by id', async () => {
      const category = {
        categoryId: '1',
        name: 'Category 2',
        description: 'Category 1 description',
      };
      jest
        .spyOn(productCategoryService, 'getById')
        .mockImplementation(
          () => Promise.resolve(singleCategory) as Promise<ProductCategory>
        );
      const categoryId = '1';
      const getCategory = await productCategoryController.getById(categoryId);
      expect(getCategory).toEqual(category);
    });
  });

  describe('Create category', () => {
    it('should create a category', async () => {
      const result = newCategoryMock;
      jest
        .spyOn(productCategoryService, 'create')
        .mockImplementation(
          () => Promise.resolve(result) as Promise<ProductCategory>
        );
      const categoryId = '1';
      const createCategoryDto = {
        name: 'Category 2',
        description: 'Category 1 description',
      };
      const newCategory = {
        categoryId,
        ...createCategoryDto,
        businesses: businessStub,
      };
      const category = await productCategoryController.create(
        createCategoryDto,
        userId
      );
      expect(category).toEqual(newCategory);
    });
  });

  describe('Update category', () => {
    it('should update a category', async () => {
      const result = categoryUpdated;
      jest
        .spyOn(productCategoryService, 'update')
        .mockImplementation(
          () => Promise.resolve(result) as Promise<ProductCategory>
        );
      const categoryId = '1';
      const updateCategoryDto = {
        name: 'Category 1',
        description: 'Description updated',
      };
      const updatedCategory = {
        categoryId,
        ...updateCategoryDto,
      };

      const update = await productCategoryController.update(
        updateCategoryDto,
        categoryId
      );

      expect(update).toEqual(updatedCategory);
    });
  });

  describe('Delete category', () => {
    it('should delete a category', async () => {
      jest
        .spyOn(productCategoryService, 'delete')
        .mockImplementation(() => Promise.resolve() as Promise<void>);
      const categoryId = '1';
      const deletedCategory = await productCategoryController.delete(
        categoryId
      );
      expect(deletedCategory).toEqual(undefined);
    });
  });
});
