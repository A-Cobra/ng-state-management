import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerInterface } from '@state-management-app/types';
import { CustomersService } from '../../services/customers.service';
import { FormControl } from '@angular/forms';
import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  readonly #customersService = inject(CustomersService);
  readonly #unsubscribe$ = new Subject<void>();
  searchCustomerControl = new FormControl('', { nonNullable: true });
  customers$: Observable<CustomerInterface[]>;
  totalRecords = 0;
  pageSize = 12;

  public ngOnInit(): void {
    this.customers$ = this.#customersService
      .getCustomers(1, this.pageSize)
      .pipe(
        tap((response) => {
          this.totalRecords = response.meta.total;
          this.pageSize = response.meta.pageSize;
        }),
        map((response) => response.data)
      );
    this.searchCustomerControl.valueChanges
      .pipe(
        takeUntil(this.#unsubscribe$),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((customerName) => {
        this.searchCustomer(customerName);
      });
  }

  public searchCustomer(customerQuery: string): void {
    // TODO: implement search by customer name, last name or username functionality when BE will be ready.
    this.customers$ = this.#customersService
      .getCustomers(1, this.pageSize, customerQuery)
      .pipe(
        tap((response) => {
          this.totalRecords = response.meta.total;
        }),
        map((response) => response.data)
      );
  }

  public changePage(event: Pagination): void {
    // TODO: Verify implementation when BE will be ready.
    this.customers$ = this.#customersService
      .getCustomers(
        event.currentPage,
        this.pageSize,
        this.searchCustomerControl.value
      )
      .pipe(map((response) => response.data));
  }

  public ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
