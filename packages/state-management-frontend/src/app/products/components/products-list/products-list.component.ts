import { Component } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  mockRecords = [
    {
      id: 1,
      name: 'test',
      description: 'test',
    },
    {
      id: 2,
      name: 'test',
      description: 'test',
    },
    {
      id: 3,
      name: 'test',
      description: 'test',
    },
    {
      id: 4,
      name: 'test',
      description: 'test',
    },
    {
      id: 6,
      name: 'test',
      description: 'test',
    },
  ];
  paginationConfiguration = {
    recordsPerPage: 40,
    totalRecords: 201,
  };
}
