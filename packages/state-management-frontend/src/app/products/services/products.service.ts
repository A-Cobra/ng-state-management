import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { PaginationResult } from '@state-management-app/types';
import { HttpClient } from '@angular/common/http';
import { MOCK_PRODUCTS_DATA } from '../test/mocks';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'any',
})
export class ProductsService {
  productsControllerVersion: string;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl =
      environment.apiBaseUrl + this.productsControllerVersion
        ? '/' + this.productsControllerVersion
        : '';
  }

  getProducts(): Observable<PaginationResult<ProductInterface>> {
    return of({ ...MOCK_PRODUCTS_DATA });
    return this.http.get<PaginationResult<ProductInterface>>(
      `${this.baseUrl}/products`
    );
    return this.getProductsByQueries('', 1);
  }

  getProductsByQueries(
    searchName: string,
    currentPage: number,
    pageLimit?: 10
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
