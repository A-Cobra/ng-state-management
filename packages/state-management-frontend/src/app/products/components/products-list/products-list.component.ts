import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PaginationResult,
  ProductInterface,
} from '@state-management-app/types';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs';
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
  searchInput = this.formBuilder.control('');
  unsubscribeAll$ = new Subject<void>();
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
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.unsubscribe();
  }

  onGoBack(): void {
    this.location.back();
  }

  onPageChange(paginationData: Pagination): void {
    this.onSearchByQueries(
      this.searchInput.value ?? '',
      paginationData.currentPage
    );
  }

  onSearchByName(): void {
    this.onSearchByQueries(this.searchInput.value.trim(), 1);
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
    this.searchInput.valueChanges
      .pipe(
        debounceTime(700),
        takeUntil(this.unsubscribeAll$),
        distinctUntilChanged()
      )
      .subscribe({
        next: () => {
          this.onSearchByName();
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
