import { PRODUCT_CATEGORIES } from '../data/product-categories';
import { FormSubmitEvent } from '../models/form-submit-event.model';
import { ProductCategoryInterface } from '@state-management-app/types';

import { of, throwError } from 'rxjs';

export const mockActivatedRoute = {
  paramMap: of({
    get: () => '1',
  }),
  snapshot: {},
};

export const mockFormSubmitEvent: FormSubmitEvent = {
  id: '1',
  productCategory: {
    name: PRODUCT_CATEGORIES[0].name,
    description: PRODUCT_CATEGORIES[0].description,
  },
};

export const mockProductCategoriesService = {
  getProductCategory: (_id: string) => of(PRODUCT_CATEGORIES[0]),
  createProductCategory: (_productCategory: ProductCategoryInterface) =>
    of(PRODUCT_CATEGORIES[0]),
  updateProductCategory: (
    _id: string,
    _productCategory: ProductCategoryInterface
  ) => of(PRODUCT_CATEGORIES[1]),
};

export const mockProductCategoriesServiceFailure = {
  getProductCategory: (_id: string) =>
    throwError(() => new Error('Get product category test error')),
  createProductCategory: (_productCategory: ProductCategoryInterface) =>
    throwError(() => new Error('Create product category test error')),
  updateProductCategory: (
    _id: string,
    _productCategory: ProductCategoryInterface
  ) => throwError(() => new Error('Update product category test error')),
};
