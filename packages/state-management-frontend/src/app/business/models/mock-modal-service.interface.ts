import { ModalRef } from '@clapp1/clapp-angular';

export interface MockModalService {
  open: () => ModalRef;
  close: () => void;
}
