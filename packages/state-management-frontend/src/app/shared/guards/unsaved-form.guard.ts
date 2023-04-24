import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { UnsavedForm } from '../models/unsaved-form.model';

import { ModalService } from '@clapp1/clapp-angular';

import { Observable, of } from 'rxjs';

export const unsavedFormGuard: CanDeactivateFn<UnsavedForm> = (
  component: UnsavedForm
): Observable<boolean> => {
  const modalService = inject(ModalService);
  if (component.isFormSaved()) return of(true);

  return modalService.open(ConfirmationModalComponent, {
    data: {
      title: 'Unsaved changes',
      message: 'You have unsaved changes. Are you sure you want to leave?',
      confirmButtonLabel: 'Leave',
      cancelButtonLabel: 'Stay',
    },
    height: 'auto',
    width: '500px',
  }).afterClosed as Observable<boolean>;
};
