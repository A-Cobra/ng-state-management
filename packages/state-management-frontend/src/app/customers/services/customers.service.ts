import { ApiResponse } from '../../branches/models/api-response.model';
import { Customer } from '../models/customer.model';
import { CUSTOMERS } from '../data/customers';
import { delay, Observable, of } from 'rxjs';
import { env } from '../../environment/env.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class CustomersService {
  private readonly customers = CUSTOMERS;
  private readonly http = inject(HttpClient);

  getCustomers(
    page = 1,
    pageSize = 10,
    query = ''
  ): Observable<ApiResponse<Customer[]>> {
    // TODO: Replace with real implementation when BE will be ready. Some logic will be removed since BE will handle it.
    let filteredCustomers: Customer[];
    const formattedQuery = query.toLowerCase().trim();
    if (query === '') {
      filteredCustomers = this.customers;
    } else {
      filteredCustomers = this.customers.filter(
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
    // TODO: Check if url is correct.
    return this.http.get<Customer>(`${env.apiUrl}/customers/${id}`);
  }

  deleteCustomer(id: string): Observable<{ message: string }> {
    // TODO: Check if url is correct.
    return this.http.delete<{ message: string }>(
      `${env.apiUrl}/customers/${id}`
    );
  }

  getIsAdminInfo(): Observable<boolean> {
    // TODO: Replace with the actual implementation when doing interceptor or role management.
    return of(false).pipe(delay(2000));
  }
}
