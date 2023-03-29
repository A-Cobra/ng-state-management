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

  onNegation(): void {
    this.modalRef.close(false);
  }

  onAffirmation(): void {
    this.modalRef.close(true);
  }
}
