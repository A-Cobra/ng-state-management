import { ModalConfig } from '@clapp1/clapp-angular';
import { ConfirmationMessage } from '../../shared/models/confirmation-message.interface';

export function deleteBusinessModalConfig(businessName: string): ModalConfig {
  return {
    data: deleteBusinessConfirmationData(businessName),
    width: '300px',
    height: 'fit-content',
  };
}

function deleteBusinessConfirmationData(
  businessName: string
): ConfirmationMessage {
  return {
    title: 'Delete business',
    message: `Are you sure you want to delete the '${businessName}' business?`,
    affirmativeButtonLabel: 'Yes',
    negativeButtonLabel: 'Cancel',
  };
}
