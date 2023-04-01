import { ModalConfig } from '@clapp1/clapp-angular';

export const TEST_DELETE_BUSINESS_MODAL_CONFIG: ModalConfig = {
  data: {
    title: 'Delete business',
    message: "Are you sure you want to delete the 'MY_BUSINESS' business?",
    affirmativeButtonLabel: 'Yes',
    negativeButtonLabel: 'Cancel',
  },
  width: '300px',
  height: 'fit-content',
};
