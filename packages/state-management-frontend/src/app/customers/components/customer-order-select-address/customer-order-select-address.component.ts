import { Component, OnInit } from '@angular/core';
import { CustomerInterface } from '@state-management-app/types';
import { Observable } from 'rxjs';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-order-select-address',
  templateUrl: './customer-order-select-address.component.html',
  styleUrls: ['./customer-order-select-address.component.scss'],
})
export class CustomerOrderSelectAddressComponent implements OnInit {
  customer$: Observable<CustomerInterface>;
  title = 'Select your delivery address';
  constructor(private customersService: CustomersService) {}
  ngOnInit(): void {
    this.customer$ = this.customersService.getCustomer('1');
  }
}
