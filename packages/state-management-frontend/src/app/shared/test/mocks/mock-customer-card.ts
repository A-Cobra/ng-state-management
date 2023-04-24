import { Component, Input } from '@angular/core';
import { CustomerInterface } from '@state-management-app/types';

@Component({
  selector: 'app-customer-card',
  template: `Mock Customer Card Component`,
})
export class MockCustomerCardComponent {
  @Input() customer: CustomerInterface;
}
