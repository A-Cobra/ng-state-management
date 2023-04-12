import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiResponse } from '../../branches/models/api-response.model';
import { CUSTOMERS } from '../data/customers';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  readonly #customers = CUSTOMERS;

  getCustomers(
    page = 1,
    pageSize = 10,
    query = ''
  ): Observable<ApiResponse<Customer[]>> {
    // TODO: Replace with real implementation when BE will be ready. Some logic will be removed since BE will handle it.
    let filteredCustomers: Customer[];
    const formattedQuery = query.toLowerCase().trim();
    if (query === '') {
      filteredCustomers = this.#customers;
    } else {
      filteredCustomers = this.#customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(formattedQuery) ||
          customer.lastName.toLowerCase().includes(formattedQuery) ||
          customer.username.toLowerCase().includes(formattedQuery)
      );
    }

    return of({
      data: filteredCustomers.slice((page - 1) * pageSize, page * pageSize),
      meta: {
        total: filteredCustomers.length,
        page,
        pageSize,
      },
    });
  }

  getCustomer(id: string): Observable<Customer> {
    // TODO: Replace with real implementation when BE will be ready. Some logic will be removed since BE will handle it.
    return of(
      this.#customers.filter((customer: Customer) => customer.id === id)[0]
    );
  }

  deleteCustomer(id: string): Observable<void> {
    // TODO: Replace with real implementation when BE will be ready. Some logic will be removed since BE will handle it.
    return of(undefined);
  }
}
