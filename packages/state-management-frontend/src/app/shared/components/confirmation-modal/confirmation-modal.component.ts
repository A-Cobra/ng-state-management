import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClappButtonModule,
  ModalConfig,
  ModalModule,
  ModalRef,
} from '@clapp1/clapp-angular';
import { ConfirmationMessage } from '../../models/confirmation-message.model';

@Component({
  standalone: true,
  imports: [CommonModule, ModalModule, ClappButtonModule],
  selector: 'state-management-app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  data: ConfirmationMessage;
  constructor(
    public modalRef: ModalRef,
    public modalConfig: ModalConfig<ConfirmationMessage>
  ) {
    this.data = this.modalConfig.data as ConfirmationMessage;
  }

  onNoClick(): void {
    this.modalRef.close(false);
  }

  onModalConfirmation(): void {
    /* eslint-disable  @typescript-eslint/no-non-null-assertion */
    this.modalRef.close(true);
  }
}
