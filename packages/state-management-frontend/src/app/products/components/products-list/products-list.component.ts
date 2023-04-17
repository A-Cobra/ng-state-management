import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PaginationResult,
  ProductInterface,
} from '@state-management-app/types';
import { Observable, Subject, debounceTime, map, takeUntil } from 'rxjs';
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
  searchForm = this.formBuilder.group({
    input: [''],
  });
  searchInput = this.formBuilder.control(['']);
  unsubscribeAll$ = new Subject<string>();
  private pageLimit = 10;
  paginationConfiguration = {
    recordsPerPage: this.pageLimit,
    totalRecords: 201,
  };

  constructor(
    private location: Location,
    private productsService: ProductsService,
    private formBuilder: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
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
    this.onSearchByQueries(
      this.searchForm.value.input ?? '',
      paginationData.currentPage
    );
  }

  onSearchByName(searchName: string): void {
    this.onSearchByQueries(searchName.trim(), 1);
  }

  onSearchByQueries(searchName: string, page: number): void {
    const paginatedData$ = this.productsService.getProductsByQueries(
      searchName,
      page
    );
    this.productsList$ = paginatedData$.pipe(
      map((paginatedData: PaginationResult<ProductInterface>) => {
        this.paginationConfiguration.totalRecords = paginatedData.totalResults;
        return paginatedData.data;
      })
    );
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

  getAllProducts(): void {
    const paginatedData$ = this.productsService.getProducts();
    this.productsList$ = paginatedData$.pipe(
      map((paginatedData: PaginationResult<ProductInterface>) => {
        this.paginationConfiguration.totalRecords = paginatedData.totalResults;
        return paginatedData.data;
      })
    );
  }
}
