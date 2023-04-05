import { Component, Input } from '@angular/core';

import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'app-customer-card',
  template: `Mock Customer Card Component`,
})
export class MockCustomerCardComponent {
  @Input() customer: Customer;
}
