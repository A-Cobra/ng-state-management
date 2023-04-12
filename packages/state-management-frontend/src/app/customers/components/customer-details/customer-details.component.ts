import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  readonly #customersService = inject(CustomersService);
  readonly #activatedRoute = inject(ActivatedRoute);
  customer: Customer;

  public ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: ({ customerId }): void => {
        this.#customersService.getCustomer(customerId).subscribe({
          next: (customer) => {
            this.customer = customer;
          },
        });
      },
    });
  }

  onClickDelete(): void {
    this.#customersService.deleteCustomer(this.customer.id).subscribe();
  }

  onClickBack(): void {}
}
