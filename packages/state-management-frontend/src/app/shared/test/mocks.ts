import { ConfirmationMessage } from '../models/confirmation-message.model';

export const MOCK_CONFIRMATION_MODAL: ConfirmationMessage = {
  title: 'Delete classification',
  message: 'Are you sure to delete this classification',
  confirmButtonLabel: 'Yes',
  cancelButtonLabel: 'Cancel',
};

export const MOCK_MODAL_CONFIG = {
  data: MOCK_CONFIRMATION_MODAL,
};
