import { ModalConfig } from '@clapp1/clapp-angular';
import { ConfirmationMessage } from '../../shared/models/confirmation-message.model';

const goToBusinessesListConfirmationData: ConfirmationMessage = {
  title: 'Go to businesses list',
  message: 'Are you sure you want to go to the businesses list?',
  affirmativeButtonLabel: 'Yes',
  negativeButtonLabel: 'No',
};

export const goToBusinessesListModalConfig: ModalConfig = {
  data: goToBusinessesListConfirmationData,
  width: '300px',
  height: 'fit-content',
};
