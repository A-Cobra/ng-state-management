import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressCardComponent } from './customer-address-card.component';

describe('CustomerAddressCardComponent', () => {
  let component: CustomerAddressCardComponent;
  let fixture: ComponentFixture<CustomerAddressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddressCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
