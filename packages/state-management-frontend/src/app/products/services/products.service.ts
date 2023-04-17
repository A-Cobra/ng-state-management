import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { PaginationResult } from '@state-management-app/types';
import { HttpClient } from '@angular/common/http';
import { MOCK_PRODUCTS_DATA } from '../test/mocks';
import { environment } from '../../environments/environment';
import { PRODUCTS_CONTROLLER_VERSION } from './products-controller-version';

@Injectable({
  providedIn: 'any',
})
export class ProductsService {
  productsControllerVersion = PRODUCTS_CONTROLLER_VERSION;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.productsControllerVersion
      ? `${environment.apiBaseUrl}/v${this.productsControllerVersion}`
      : `${environment.apiBaseUrl}`;
  }

  getProducts(): Observable<PaginationResult<ProductInterface>> {
    return of({ ...MOCK_PRODUCTS_DATA });
    return this.getProductsByQueries('', 1);
  }

  getProductsByQueries(
    searchName: string,
    currentPage: number,
    pageLimit = 10
  ): Observable<PaginationResult<ProductInterface>> {
    return of({
      ...MOCK_PRODUCTS_DATA,
      data: [...MOCK_PRODUCTS_DATA.data].filter((product: ProductInterface) =>
        product.productName.toLowerCase().match(searchName.toLowerCase())
      ),
    });
    return this.http.get<PaginationResult<ProductInterface>>(
      `${
        this.baseUrl
      }?search=${searchName.toLowerCase()}&page=${currentPage}&limit=${pageLimit}`
    );
  }
}
