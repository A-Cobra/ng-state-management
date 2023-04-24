import { TestBed } from '@angular/core/testing';
import { CustomerInterface } from '@state-management-app/types';
import { map, take } from 'rxjs';
import { CustomersService } from './customers.service';
import { environment } from '../../environments/environment';
import { MOCK_CUSTOMER, MOCK_CUSTOMERS } from '../test/customers.mocks';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersService],
    });
    customersService = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(customersService).toBeTruthy();
  });

  it('should return a list of customers', (done) => {
    customersService
      .getCustomers()
      .pipe(take(1))
      .subscribe((response) => {
        expect(response.data).toEqual(MOCK_CUSTOMERS.slice(0, 10));
        done();
      });
  });

  it('should return a list of customers filtered by query', (done) => {
    customersService
      .getCustomers(1, 5, 'john')
      .pipe(
        take(1),
        map((response) => response.data)
      )
      .subscribe((customers) => {
        expect(customers.length).toBe(3);
        done();
      });
  });

  it('should return a customer searched by id', () => {
    const customerId = '1';
    const response: CustomerInterface = MOCK_CUSTOMER;
    customersService.getCustomer(customerId).subscribe((data) => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/customers/${customerId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return a string base on the resquest state', () => {
    const customerId = '1';
    const response = 'Customer deleted successfully';
    customersService.deleteCustomer(customerId).subscribe((data) => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/customers/${customerId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });

  it('should return if user is admin', () => {
    const response = false;
    customersService.getIsAdminInfo().subscribe((data) => {
      expect(data).toEqual(response);
    });
  });
});
