import { Test } from '@nestjs/testing';
import { ProductCategoryController } from '../controllers/product-category.controller';
import { ProductCategoryService } from '../services/product-category.service';
import {
  getCategoriesResponse,
  categorySearch,
  singleCategory,
  categoryUpdated,
} from './product-category.stub';
import { PaginationResult } from '@state-management-app/types';
import { ProductCategory } from '../entities/product-category.entity';
import { BusinessService } from '../../business/services/business.service';
import { EntityRepository } from '@mikro-orm/core';
import { BusinessHq } from '../../business/entities/business.entity';
import { businessStub } from '../../business/tests/business.stubs';

describe('ProductCategoryController', () => {
  let productCategoryController: ProductCategoryController;
  let productCategoryService: ProductCategoryService;

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

  describe('Get all categories', () => {
    it('Should return all categories', async () => {
      const result = getCategoriesResponse;
      jest
        .spyOn(productCategoryService, 'getAll')
        .mockImplementation(
          () =>
            Promise.resolve(result) as Promise<
              PaginationResult<ProductCategory>
            >
        );
      expect(
        await productCategoryController.getAll({ page: 1, limit: 10 }, '1')
      ).toEqual(result);
    });
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
      const search = await productCategoryController.search(
        paginationDto,
        '1',
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
      const result = singleCategory;
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
      };
      const category = await productCategoryController.create(
        createCategoryDto,
        '1'
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
