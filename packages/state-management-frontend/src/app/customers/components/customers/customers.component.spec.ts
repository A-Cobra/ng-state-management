import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomerInterface } from '@state-management-app/types';
import { Observable, of, take } from 'rxjs';
import { CustomersComponent } from './customers.component';
import { ApiResponse } from '../../../branches/models/api-response.model';
import { MOCK_PAGINATION } from '../../../shared/test/constants/mocks';
import { MockCustomerCardComponent } from '../../../shared/test/mocks/mock-customer-card';
import { CustomersService } from '../../services/customers.service';
import { MOCK_CUSTOMERS } from '../../test/customers.mocks';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';

const mockCustomersService = {
  getCustomers: jest.fn(
    (
      page = 1,
      pageSize = 10,
      _query = ''
    ): Observable<ApiResponse<CustomerInterface[]>> => {
      return of({
        data: MOCK_CUSTOMERS,
        meta: {
          total: MOCK_CUSTOMERS.length,
          page,
          pageSize,
        },
      });
    }
  ),
};

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersComponent, MockCustomerCardComponent],
      imports: [
        ClappButtonModule,
        ClappCardModule,
        ClappPaginationModule,
        ClappSearchModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search customer by name, last name or username', fakeAsync(() => {
    const searchCustomerControl = component.searchCustomerControl;
    const searchCustomerSpy = jest.spyOn(component, 'searchCustomer');

    searchCustomerControl.setValue('test');
    tick(700);

    expect(searchCustomerSpy).toHaveBeenCalledWith('test');
  }));

  it('should search customer by name, last name or username an assign result properties', () => {
    component.searchCustomer('test method');
    component.customers$.pipe(take(1)).subscribe((customers) => {
      expect(component.totalRecords).toBe(MOCK_CUSTOMERS.length);
      expect(customers).toEqual(MOCK_CUSTOMERS);
    });
    component.searchCustomer('test method');
  });

  it('should get customer by page and assign result properties', () => {
    component.pageSize = 1;
    fixture.detectChanges();
    const pagination = fixture.debugElement.query(By.css('clapp-pagination'));

    pagination.triggerEventHandler('pageChange', MOCK_PAGINATION);

    component.customers$.pipe(take(1)).subscribe((customers) => {
      expect(component.totalRecords).toBe(MOCK_CUSTOMERS.length);
      expect(customers).toEqual(MOCK_CUSTOMERS);
    });
  });
});
