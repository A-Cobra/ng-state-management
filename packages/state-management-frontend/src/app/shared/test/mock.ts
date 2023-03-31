import { ConfirmationMessage } from '../models/confirmation-message.interface';

export const MOCK_CONFIRMATION_MODAL: ConfirmationMessage = {
  title: 'Delete classification',
  message: 'Are you sure to delete this classification',
  affirmativeButtonLabel: 'Yes',
  negativeButtonLabel: 'Cancel',
};

export const MOCK_MODAL_CONFIG = {
  data: MOCK_CONFIRMATION_MODAL,
};
