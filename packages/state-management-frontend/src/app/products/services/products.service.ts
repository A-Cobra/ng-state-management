import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { HttpClient } from '@angular/common/http';
import { MOCK_PRODUCTS_DATA } from '../test/mocks';

const API_URL = 'http://domain.com/api';

@Injectable({
  providedIn: 'any',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductInterface[]> {
    return of(MOCK_PRODUCTS_DATA);
    return this.http.get<ProductInterface[]>(API_URL);
  }

  getProductsByName(searchName: string): Observable<ProductInterface[]> {
    return of(
      MOCK_PRODUCTS_DATA.filter((product: ProductInterface) =>
        product.productName.toLowerCase().match(searchName.toLowerCase())
      )
    );
    return this.http.get<ProductInterface[]>(
      `${API_URL}&search_name=${searchName.toLowerCase()}`
    );
  }
}
