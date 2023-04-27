import { Component, Input } from '@angular/core';
import { Address } from '@state-management-app/types';

@Component({
  selector: 'app-customer-address-card',
  templateUrl: './customer-address-card.component.html',
  styleUrls: ['./customer-address-card.component.scss'],
})
export class CustomerAddressCardComponent {
  @Input()
  address: Address;
}
