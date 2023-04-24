import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerInterface } from '@state-management-app/types';
import { delay, Observable, of, throwError } from 'rxjs';
import { ApiResponse } from '../../branches/models/api-response.model';
import { environment } from '../../environments/environment';
import { MOCK_CUSTOMERS } from '../test/customers.mocks';
@Injectable()
export class CustomersService {
  private customers: CustomerInterface[] = MOCK_CUSTOMERS;
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

  getCustomer(customerId: string): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface>(
      `${environment.apiBaseUrl}/customers/${customerId}`
    );
    //  If you want test it locally, you can use this code:
    // const customerFiltered: CustomerInterface = this.customers.filter(
    //   (customer) => customer.customerId === customerId
    // )[0];

    // if (!customerFiltered) return throwError('Customer not found');
    // return of(customerFiltered);
  }

  deleteCustomer(customerId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${environment.apiBaseUrl}/customers/${customerId}`
    );
    //  If you want test it locally, you can use this code:
    // this.customers = this.customers.filter(
    //   (customer) => customer.customerId !== customerId
    // );
    // return of({ message: 'Customer deleted successfully' });
  }

  getIsAdminInfo(): Observable<boolean> {
    // TODO: Replace with the actual implementation when the interceptor or role management will be done.
    return of(true).pipe(delay(2000));
  }
}
