import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalRef, ModalService } from '@clapp1/clapp-angular';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { backModalConfig, deleteModalConfig } from '../../utils/modal-config';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer: Customer;
  readonly #customersService = inject(CustomersService);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #modalService = inject(ModalService);
  readonly #unsubscribe$ = new Subject<void>();

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

  public ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }

  onClickDelete(): void {
    const deleteModalRef = this.deleteModal();

    deleteModalRef.afterClosed
      .pipe(take(1), takeUntil(this.#unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.deleteCustomer();
        }
      });
  }

  deleteCustomer(): void {
    this.#customersService.deleteCustomer(this.customer.id).subscribe({
      next: () => {
        // Navigate to customers list
        console.log('Navigating to customers list');
      },
    });
  }

  onClickBack(): void {
    const backModalRef = this.backModal();

    backModalRef.afterClosed
      .pipe(take(1), takeUntil(this.#unsubscribe$))
      .subscribe((result) => {
        if (result) {
          // Navigate back
          console.log('Navigating back');
        }
      });
  }

  backModal(): ModalRef {
    return this.#modalService.open(ConfirmationModalComponent, backModalConfig);
  }

  deleteModal(): ModalRef {
    return this.#modalService.open(
      ConfirmationModalComponent,
      deleteModalConfig
    );
  }
}
