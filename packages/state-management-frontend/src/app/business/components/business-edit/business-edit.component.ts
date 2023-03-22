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
    displayName: ['Dasdsa', [Validators.required]],
    businessName: ['', [Validators.required]],
    businessClassification: ['1', [Validators.required]],
    contactPhoneNumber: ['987654321', [Validators.required]],
    contactEmail: [
      'name@domain.suffix',
      [
        Validators.required,
        Validators.email,
        /*CustomFormValidators.email*/
      ],
    ],
    contactAddress: ['Address', [Validators.required]],
    longitude: ['Longitude', [Validators.required]],
    latitude: ['Latitude', [Validators.required]],
  });

  constructor(private formBuilder: NonNullableFormBuilder) {
    this.disableFormControls();
  }

  onEditClick(): void {
    this.toggleEditingStatus();
    this.enableFormControls();
  }

  onSaveClick(): void {
    // MAKE VALIDATIONS
    this.toggleEditingStatus();
    this.disableFormControls();
  }

  toggleEditingStatus(): void {
    this.editing = !this.editing;
  }

  disableFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit.get(key)?.disable();
    });
  }

  enableFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit.get(key)?.enable();
    });
  }

  hasError = (controlName: string, errorName: string): boolean => {
    const control = this.businessFormEdit.get(controlName);
    return control ? control.hasError(errorName) : false;
  };
}
