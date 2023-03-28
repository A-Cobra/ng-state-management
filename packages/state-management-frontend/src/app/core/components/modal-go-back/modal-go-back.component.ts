import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ModalService } from '@clapp1/clapp-angular';

@Component({
  selector: 'state-management-app-modal-go-back',
  templateUrl: './modal-go-back.component.html',
  styleUrls: ['./modal-go-back.component.scss'],
})
export class ModalGoBackComponent {
  constructor(private location: Location, private modalService: ModalService) {}

  @Output() goBack: EventEmitter<string> = new EventEmitter();

  handleCancel(): void {
    this.modalService.close();
  }

  handleGoBack(): void {
    // this.location.back();
    this.goBack.emit('back');
  }
}
