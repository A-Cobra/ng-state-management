import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInjector, ModalModule } from '@clapp1/clapp-angular';

@Component({
  selector: 'state-management-app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    //private modalRef: ModalRef,
    @Inject(ModalInjector) public data: any
  ) {}
}
