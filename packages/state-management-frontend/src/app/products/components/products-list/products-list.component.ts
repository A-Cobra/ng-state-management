import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productsList$: Observable<ProductInterface[]>;
  paginationConfiguration = {
    recordsPerPage: 40,
    totalRecords: 201,
  };
  // searchForm =

  constructor(
    private location: Location,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsList$ = this.productsService.getProducts();
  }

  onGoBack(): void {
    this.location.back();
  }

  // onInputSearch(searchName: string):void{

  // }

  onSearchByName(searchName: string): void {
    this.productsList$ = this.productsService.getProductsByName(searchName);
  }
}
