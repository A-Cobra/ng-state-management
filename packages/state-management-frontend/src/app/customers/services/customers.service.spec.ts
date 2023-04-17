import { CUSTOMERS } from '../data/customers';
import { CustomersService } from './customers.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { map, take } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CustomersService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of customers', (done) => {
    service
      .getCustomers()
      .pipe(take(1))
      .subscribe((response) => {
        expect(response.data).toEqual(CUSTOMERS.slice(0, 10));
        done();
      });
  });

  it('should return a list of customers filtered by query', (done) => {
    service
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
});
