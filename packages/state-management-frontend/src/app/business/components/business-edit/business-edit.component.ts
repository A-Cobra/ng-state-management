import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'state-management-app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent {
  editing = false;

  businessFormEdit = this.formBuilder.group({
    displayName: ['', [Validators.required, Validators.email]],
    businessName: ['', [Validators.required]],
    businessClassification: ['1', []],
    contactPhoneNumber: ['987654321', []],
    contactEmail: [
      'name@domain.suffix',
      [
        /*CustomFormValidators.email*/
      ],
    ],
    contactAddress: ['Address', []],
    longitude: ['Longitude', []],
    latitude: ['Latitude', []],
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}

  onEditClick() {
    this.toggleEditingStatus();
  }

  onSaveClick() {
    this.toggleEditingStatus();
  }

  toggleEditingStatus() {
    this.editing = !this.editing;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.businessFormEdit.get(controlName);
    return control ? control.hasError(errorName) : false;
  }
}
