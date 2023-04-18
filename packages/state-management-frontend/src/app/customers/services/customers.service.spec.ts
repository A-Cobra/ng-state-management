import { Customer } from '../models/customer.model';
import { CUSTOMERS } from '../data/customers';
import { CustomersService } from './customers.service';
import { env } from '../../environment/env.development';
import { map, take } from 'rxjs';
import { MOCK_CUSTOMER } from '../test/mocks';
import { TestBed } from '@angular/core/testing';
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
        expect(response.data).toEqual(CUSTOMERS.slice(0, 10));
        done();
      });
  });

  it('should return a list of customers filtered by query', (done) => {
    customersService
      .getCustomers(1, 10, 'marksmith')
      .pipe(
        take(1),
        map((response) => response.data)
      )
      .subscribe((customers) => {
        expect(customers.length).toBe(3);
        done();
      });
  });

  describe('getCustomer', () => {
    it('should return an Observable<Customer>', () => {
      const customerId = '1';
      const response: Customer = MOCK_CUSTOMER;
      customersService.getCustomer(customerId).subscribe((data) => {
        expect(data).toEqual(response);
      });
      const req = httpMock.expectOne(`${env.apiUrl}/customers/${customerId}`);
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('deleteCustomer', () => {
    it('should return an Observable<string>', () => {
      const customerId = '1';
      const response = 'Customer deleted successfully';
      customersService.deleteCustomer(customerId).subscribe((data) => {
        expect(data).toEqual(response);
      });
      const req = httpMock.expectOne(`${env.apiUrl}/customers/${customerId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(response);
    });
  });

  describe('getIsAdminInfo', () => {
    it('should return an Observable<boolean>', () => {
      const response = false;
      customersService.getIsAdminInfo().subscribe((data) => {
        expect(data).toEqual(response);
      });
    });
  });
});
