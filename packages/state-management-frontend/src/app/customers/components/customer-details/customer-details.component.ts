import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalRef, ModalService } from '@clapp1/clapp-angular';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { backModalConfig, deleteModalConfig } from '../../utils/modal-config';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer: Customer;
  hasCustomer = true;
  isLoading = true;
  isAdmin = false;
  readonly #unsubscribe$ = new Subject<void>();
  readonly #customersService = inject(CustomersService);
  readonly #modalService = inject(ModalService);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly #router = inject(Router);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: ({ customerId }): void => {
        this.#customersService
          .getCustomer(customerId)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe({
            next: (customer) => {
              this.customer = customer;
            },
            error: () => {
              this.hasCustomer = false;
            },
          });
      },
    });

    this.#customersService
      .getIsAdminInfo()
      .pipe(takeUntil(this.#unsubscribe$))
      .subscribe({
        next: (isAdmin: boolean) => {
          this.isAdmin = isAdmin;
        },
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }

  onClickDelete(): void {
    const deleteModalRef = this.deleteModal();

    deleteModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.deleteCustomer();
    });
  }

  deleteCustomer(): void {
    this.#customersService.deleteCustomer(this.customer.id).subscribe({
      next: () => {
        this.navigateToCustomers();
      },
    });
  }

  onClickBack(): void {
    const backModalRef = this.backModal();

    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.navigateToCustomers();
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

  navigateToCustomers(): void {
    this.#router.navigate(['/customers']);
  }
}
