import { ApiResponse } from '../../branches/models/api-response.model';
import { CustomerInterface } from '@state-management-app/types';
import { CUSTOMERS } from '../data/customers';
import { delay, Observable, of } from 'rxjs';
import { env } from '../../environment/env.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MOCK_CUSTOMER } from '../test/mocks';

@Injectable()
export class CustomersService {
  private readonly customers: CustomerInterface[] = CUSTOMERS;
  private readonly http = inject(HttpClient);

  getCustomers(
    page = 1,
    pageSize = 10,
    query = ''
  ): Observable<ApiResponse<CustomerInterface[]>> {
    // TODO: Replace with real implementation when BE will be ready. Some logic will be removed since BE will handle it.
    let filteredCustomers: CustomerInterface[];
    const formattedQuery = query.toLowerCase().trim();
    if (query === '') {
      filteredCustomers = this.customers;
    } else {
      filteredCustomers = this.customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(formattedQuery) ||
          customer.lastname?.toLowerCase().includes(formattedQuery) ||
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

  getCustomer(id: string): Observable<CustomerInterface> {
    // TODO: Check if url is correct.
    // return of(MOCK_CUSTOMER);
    return this.http.get<CustomerInterface>(`${env.apiUrl}/customers/${id}`);
  }

  deleteCustomer(id: string): Observable<{ message: string }> {
    // TODO: Check if url is correct.
    return this.http.delete<{ message: string }>(
      `${env.apiUrl}/customers/${id}`
    );
  }

  getIsAdminInfo(): Observable<boolean> {
    // TODO: Replace with the actual implementation when doing interceptor or role management.
    return of(true).pipe(delay(2000));
  }
}
