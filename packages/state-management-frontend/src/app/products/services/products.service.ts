import { Injectable } from '@angular/core';
import { ProductsModule } from '../products.module';
import { Observable } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://domain.com/api';

@Injectable({
  providedIn: ProductsModule,
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(API_URL);
  }

  getProductsByName(searchName: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(
      `${API_URL}&search_name=${searchName.toLowerCase()}`
    );
  }
}
