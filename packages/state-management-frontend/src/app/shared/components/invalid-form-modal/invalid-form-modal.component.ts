import { Component } from '@angular/core';
import { ClappButtonModule, ModalService } from '@clapp1/clapp-angular';

@Component({
  selector: 'app-invalid-form-modal',
  styleUrls: ['./invalid-form-modal.component.scss'],
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
  standalone: true,
  imports: [ClappButtonModule],
})
export class InvalidFormModalComponent {
  constructor(private modalService: ModalService) {}

  onConfirmClick() {
    this.modalService.close();
  }
}
