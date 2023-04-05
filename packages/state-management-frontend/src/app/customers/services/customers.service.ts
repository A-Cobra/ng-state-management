import { Injectable } from '@angular/core';

import { CUSTOMERS } from '../data/customers';
import { ApiResponse } from '../../branches/models/api-response.model';
import { Customer } from '../models/customer.model';

import { Observable, of } from 'rxjs';

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
}
