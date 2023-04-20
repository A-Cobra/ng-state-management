import { ApiResponse } from '../../branches/models/api-response.model';
import { CustomerInterface } from '@state-management-app/types';
import { CUSTOMERS } from '../data/customers';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class CustomersService {
  private customers: CustomerInterface[] = CUSTOMERS;
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
    return this.http.get<CustomerInterface>(
      `${environment.apiBaseUrl}/customers/${id}`
    );
    //  If you want test it locally, you can use this code:
    // return of(
    //   this.customers.filter((customer) => customer.customerId === id)[0]
    // );
  }

  deleteCustomer(id: string): Observable<{ message: string }> {
    // TODO: Check if url is correct.
    return this.http.delete<{ message: string }>(
      `${environment.apiBaseUrl}/customers/${id}`
    );
    //  If you want test it locally, you can use this code:
    // this.customers = this.customers.filter(
    //   (customer) => customer.customerId !== id
    // );
    // return of({ message: 'Customer deleted successfully' });
  }

  getIsAdminInfo(): Observable<boolean> {
    // TODO: Replace with the actual implementation when the interceptor or role management will be done.
    return of(true).pipe(delay(2000));
  }
}
