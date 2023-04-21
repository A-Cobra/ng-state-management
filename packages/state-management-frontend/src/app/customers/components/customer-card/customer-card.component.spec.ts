import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCardComponent } from './customer-card.component';
import { MOCK_CUSTOMER } from '../../test/customers.mocks';

import {
  ClappCardModule,
  ClappImageDisplayModule,
} from '@clapp1/clapp-angular';

describe('CustomerCardComponent', () => {
  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerCardComponent],
      imports: [ClappImageDisplayModule, ClappCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    component.customer = MOCK_CUSTOMER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render customer information', () => {
    expect(fixture).toMatchSnapshot();
  });
});
