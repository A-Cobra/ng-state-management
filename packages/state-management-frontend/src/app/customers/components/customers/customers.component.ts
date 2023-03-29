import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';

@Component({
  selector: 'state-management-app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  readonly #customersService = inject(CustomersService);
  readonly #unsubscribe$ = new Subject<void>();
  searchCustomerControl = new FormControl('', { nonNullable: true });
  customers$: Observable<Customer[]>;
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
        this.searchBranch(customerName);
      });
  }

  public searchBranch(customerName: string): void {
    // TODO: implement search by branch name functionality when BE will be ready.
    this.customers$ = this.#customersService
      .getCustomers(1, this.pageSize, customerName)
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
