import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';
import { Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  productsList$: Observable<ProductInterface[]>;
  paginationConfiguration = {
    recordsPerPage: 40,
    totalRecords: 201,
  };
  paginationData: Pagination = {
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    lastPage: 0,
  };
  searchForm = this.formBuilder.group({
    input: [''],
  });
  searchInput = this.formBuilder.control(['']);
  unsubscribeAll$ = new Subject<string>();

  constructor(
    private location: Location,
    private productsService: ProductsService,
    private formBuilder: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.productsList$ = this.productsService.getProducts();
    this.setupInputDebounce();
  }
  ngOnDestroy(): void {
    this.unsubscribeAll$.next('');
    this.unsubscribeAll$.unsubscribe();
  }

  onGoBack(): void {
    this.location.back();
  }

  onPageChange(paginationData: Pagination): void {
    console.log(paginationData);
  }

  onSearchByName(searchName: string): void {
    this.productsList$ = this.productsService.getProductsByName(searchName);
  }

  setupInputDebounce(): void {
    this.searchForm.controls['input'].valueChanges
      .pipe(debounceTime(700), takeUntil(this.unsubscribeAll$))
      .subscribe({
        next: (searchName: string) => {
          this.onSearchByName(searchName);
        },
      });
  }
}
