import { ModalConfig } from '@clapp1/clapp-angular';
import { ConfirmationMessage } from '../../shared/models/confirmation-message.interface';

const goToBusinessesListConfirmationData: ConfirmationMessage = {
  title: 'Delete business',
  message: 'Are you sure you want to go to the businesses list?',
  affirmativeButtonLabel: 'Yes',
  negativeButtonLabel: 'No',
};

export const goToBusinessesListModalConfig: ModalConfig = {
  data: goToBusinessesListConfirmationData,
  width: '300px',
  height: 'fit-content',
};
