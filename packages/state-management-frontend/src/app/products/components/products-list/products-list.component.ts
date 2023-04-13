import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS_DATA } from '../../test/mocks';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  productsList$: Observable<ProductInterface[]> =
    // of([]);
    of(MOCK_PRODUCTS_DATA);
  paginationConfiguration = {
    recordsPerPage: 40,
    totalRecords: 201,
  };

  constructor(private location: Location) {}

  onGoBack(): void {
    this.location.back();
  }
}
