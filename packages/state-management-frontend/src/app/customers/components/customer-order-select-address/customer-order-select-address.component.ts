import { Component, OnInit } from '@angular/core';
import { Address, CustomerInterface } from '@state-management-app/types';
import { Observable } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { AddressesService } from '../../services/addresses.service';

@Component({
  selector: 'app-customer-order-select-address',
  templateUrl: './customer-order-select-address.component.html',
  styleUrls: ['./customer-order-select-address.component.scss'],
})
export class CustomerOrderSelectAddressComponent implements OnInit {
  addresses$: Observable<Address[]>;
  title = 'Select your delivery address';
  constructor(private addressesService: AddressesService) {}
  ngOnInit(): void {
    this.addresses$ = this.addressesService.getAddressesByUserId('1');
  }
}
