import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  productsList: ProductInterface[] = [
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
  ];
  paginationConfiguration = {
    recordsPerPage: 40,
    totalRecords: 201,
  };

  constructor(private location: Location) {}

  onGoBack(): void {
    this.location.back();
  }
}
