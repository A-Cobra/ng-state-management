import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ClappButtonModule, ModalService } from '@clapp1/clapp-angular';

@Component({
  selector: 'state-management-app-go-back-modal',
  templateUrl: './go-back-modal.component.html',
  styleUrls: ['./go-back-modal.component.scss'],
  standalone: true,
  imports: [ClappButtonModule],
})
export class GoBackModalComponent {
  constructor(private location: Location, private modalService: ModalService) {}

  handleCancel(): void {
    this.modalService.close();
  }

  handleGoBack(): void {
    this.location.back();
  }
}
