import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderSelectAddressComponent } from './customer-order-select-address.component';

describe('CustomerOrderSelectAddressComponent', () => {
  let component: CustomerOrderSelectAddressComponent;
  let fixture: ComponentFixture<CustomerOrderSelectAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOrderSelectAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerOrderSelectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
