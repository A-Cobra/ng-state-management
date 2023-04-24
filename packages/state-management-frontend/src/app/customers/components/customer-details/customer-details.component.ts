import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerInterface } from '@state-management-app/types';
import { Subject, take, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CustomersService } from '../../services/customers.service';
import { backModalConfig, deleteModalConfig } from '../../utils/modal-config';
import {
  ModalRef,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer: CustomerInterface;
  hasCustomer = true;
  isLoading = true;
  isAdmin = false;
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly unsubscribe$ = new Subject<void>();
  private readonly customersService = inject(CustomersService);
  private readonly modalService = inject(ModalService);
  private readonly notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({ customerId }): void => {
        this.customersService
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

    this.customersService
      .getIsAdminInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (isAdmin: boolean) => {
          this.isAdmin = isAdmin;
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickDelete(): void {
    if (!this.customer) return;
    const deleteModalRef = this.getDeleteModal();

    deleteModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.deleteCustomer();
    });
  }

  onClickBack(): void {
    const backModalRef = this.getBackModal();

    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.navigateToCustomers();
    });
  }

  deleteCustomer(): void {
    this.isLoading = true;

    this.customersService
      .deleteCustomer(this.customer.customerId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.showNotificationSuccess();
          this.navigateToCustomers();
        },
        error: () => {
          this.showNotificationError();
        },
      });
  }

  getBackModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, backModalConfig);
  }

  getDeleteModal(): ModalRef {
    return this.modalService.open(
      ConfirmationModalComponent,
      deleteModalConfig
    );
  }

  showNotificationSuccess(): void {
    this.notificationService.success(
      'Customer deleted successfully',
      'Success!'
    );
  }

  showNotificationError(): void {
    this.notificationService.error(
      'Customer could not be deleted',
      'Unexpected error!'
    );
  }

  navigateToCustomers(): void {
    this.router.navigate(['/customers']);
  }
}
