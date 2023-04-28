import { ConfirmationMessage } from '../models/confirmation-message.model';

import { ModalRef } from '@clapp1/clapp-angular';

import { BehaviorSubject, Observable } from 'rxjs';

export const MOCK_CONFIRMATION_MODAL: ConfirmationMessage = {
  title: 'Delete classification',
  message: 'Are you sure to delete this classification',
  affirmativeButtonLabel: 'Yes',
  negativeButtonLabel: 'Cancel',
};

export const MOCK_MODAL_CONFIG = {
  data: MOCK_CONFIRMATION_MODAL,
};

export class MockModalService {
  private value$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  set value(newValue: boolean) {
    this.value$.next(newValue);
  }

  open(): ModalRef {
    return {
      afterClosed: this.value$.asObservable() as Observable<unknown>,
    } as ModalRef;
  }
}
