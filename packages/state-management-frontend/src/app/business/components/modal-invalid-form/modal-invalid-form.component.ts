import { Component } from '@angular/core';
import { ModalService } from '@clapp1/clapp-angular';

@Component({
  selector: 'state-management-app-modal-invalid-form',
  styleUrls: ['./modal-invalid-form.component.scss'],
  template: `
    <div class="modal">
      <h2>Invalid Form</h2>
      <p>
        The form is invalid. Please fill all the required fields with the
        correct format and try again.
      </p>
      <clapp-button
        (click)="onConfirmClick()"
        color="tertiary"
        size="small"
        type="button"
      >
        OK
      </clapp-button>
    </div>
  `,
})
export class ModalInvalidFormComponent {
  constructor(private modalService: ModalService) {}

  onConfirmClick() {
    this.modalService.close();
  }
}
