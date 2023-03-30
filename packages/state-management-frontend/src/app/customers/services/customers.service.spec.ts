import { TestBed } from '@angular/core/testing';

import { CUSTOMERS } from '../data/customers';
import { CustomersService } from './customers.service';

import { map, take } from 'rxjs';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of customers', () => {
    service
      .getCustomers()
      .pipe(take(1))
      .subscribe((response) => {
        expect(response.data).toEqual(CUSTOMERS);
      });
  });

  it('should return a list of customers filtered by query', () => {
    service
      .getCustomers(1, 10, 'marksmith')
      .pipe(
        take(1),
        map((response) => response.data)
      )
      .subscribe((customers) => {
        expect(customers.length).toBe(3);
      });
  });
});
