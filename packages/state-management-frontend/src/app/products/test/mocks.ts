import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';
import {
  PaginationResult,
  ProductInterface,
} from '@state-management-app/types';
import { Observable } from 'rxjs';

export const CLAPP_MODULES = [
  ClappPaginationModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappCardModule,
];

export interface MockHttpClient {
  get: () => Observable<any>;
}

export interface MockLocation {
  back: () => void;
}

export interface MockProductsService {
  getProducts: () => Observable<PaginationResult<ProductInterface>>;
  getProductsByQueries: (
    searchName: string,
    currentPage: number,
    pageLimit?: 10
  ) => Observable<PaginationResult<ProductInterface>>;
}

export const API_URL = 'http://domain.com/api';

export const MOCK_PRODUCTS_DATA: PaginationResult<ProductInterface> = {
  data: [
    {
      idProduct: '1',
      productName: 'name1',
      description: 'description1',
      price: 1,
      discount: 5,
      stock: 500,
      status: 'available',
    },
    {
      idProduct: '2',
      productName: 'name2',
      description: 'description2',
      price: 6,
      discount: 12,
      stock: 400,
      status: 'available',
    },
    {
      idProduct: '3',
      productName: 'name3',
      description: 'description3',
      price: 30,
      discount: 20,
      stock: 10,
      status: 'available',
    },
  ],
  totalResults: 20,
  page: 1,
  totalPages: 1,
};

export const PAGINATION_DATA: Pagination = {
  previousPage: null,
  currentPage: 1,
  nextPage: null,
  lastPage: 0,
};
