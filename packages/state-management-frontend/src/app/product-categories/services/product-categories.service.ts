import { Injectable } from '@angular/core';

import { PRODUCT_CATEGORIES } from '../data/product-categories';
import { ProductCategoryInterface } from '@state-management-app/types';

import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  //TODO: replace all methods with http requests when backend is ready
  #productCategories: ProductCategoryInterface[] = PRODUCT_CATEGORIES;
  getProductCategory(id: string): Observable<ProductCategoryInterface> {
    const productCategory = this.#productCategories.find(
      (productCategoryItem) => productCategoryItem.id === id
    );
    if (!productCategory) {
      return throwError(() => new Error('Product category not found'));
    }

    return of(productCategory).pipe(delay(2000));
  }

  createProductCategory(
    productCategory: ProductCategoryInterface
  ): Observable<ProductCategoryInterface> {
    const productCategoryWithId = {
      id: String(this.#productCategories.length + 1),
      ...productCategory,
    };
    this.#productCategories.push(productCategoryWithId);
    return of(productCategoryWithId).pipe(delay(1000));
  }

  updateProductCategory(
    id: string,
    updatedProductCategory: Partial<ProductCategoryInterface>
  ): Observable<ProductCategoryInterface> {
    this.#productCategories = this.#productCategories.map((productCategory) =>
      productCategory.id === id
        ? { id, ...productCategory, ...updatedProductCategory }
        : productCategory
    );
    return of(
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.#productCategories.find(
        (productCategory) => productCategory.id === id
      )!
    ).pipe(delay(1000));
  }
}
