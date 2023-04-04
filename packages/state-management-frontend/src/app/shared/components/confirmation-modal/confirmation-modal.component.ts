import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClappButtonModule,
  ModalConfig,
  ModalModule,
  ModalRef,
} from '@clapp1/clapp-angular';
import { ConfirmationMessage } from '../../models/confirmation-message.interface';

@Component({
  standalone: true,
  imports: [CommonModule, ModalModule, ClappButtonModule],
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styles: [':host {text-align: center;padding: 0 8px 8px}'],
})
export class ConfirmationModalComponent {
  data: ConfirmationMessage;
  constructor(
    public modalRef: ModalRef,
    public modalConfig: ModalConfig<ConfirmationMessage>
  ) {
    this.data = this.modalConfig.data as ConfirmationMessage;
  }

  closeModal(value: boolean): void {
    this.modalRef.close(value);
  }
}
