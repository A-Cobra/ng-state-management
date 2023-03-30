import { Component, Input } from '@angular/core';

import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'state-management-app-customer-card',
  template: `Mock Customer Card Component`,
})
export class MockCustomerCardComponent {
  @Input() customer: Customer;
}
