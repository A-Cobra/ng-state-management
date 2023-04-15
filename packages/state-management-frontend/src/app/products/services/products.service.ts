import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { PaginationResult } from '@state-management-app/types';
import { HttpClient } from '@angular/common/http';
import { MOCK_PRODUCTS_DATA } from '../test/mocks';

const API_URL = 'http://domain.com/api';

@Injectable({
  providedIn: 'any',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<PaginationResult<ProductInterface>> {
    return of({ ...MOCK_PRODUCTS_DATA });
    return this.http.get<PaginationResult<ProductInterface>>(API_URL);
    return this.getProductsByQueries('', 1);
  }

  // getProductsByName(searchName: string): Observable<ProductInterface[]> {
  //   return of(
  //     [...MOCK_PRODUCTS_DATA].filter((product: ProductInterface) =>
  //       product.productName.toLowerCase().match(searchName.toLowerCase())
  //     )
  //   );
  //   return this.http.get<ProductInterface[]>(
  //     `${API_URL}&search_name=${searchName.toLowerCase()}`
  //   );
  // }

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
      `${API_URL}?search=${searchName.toLowerCase()}&page=${currentPage}&limit=${pageLimit}`
    );
  }
}
