import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@clapp1/clapp-angular';
import { ModalInvalidFormComponent } from '../modal-invalid-form/modal-invalid-form.component';

@Component({
  selector: 'state-management-app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent {
  editing = false;

  mockBusinessInfo = {
    displayName: 'Business Display Name',
    businessName: 'Business Name',
    businessClassification: 'Option 2',
    contactPhoneNumber: '987654321',
    contactEmail: 'name@domain.suffix',
    contactAddress: 'Address',
    longitude: 'Longitude',
    latitude: 'Latitude',
    imgUrl: '',
    totalBranches: 12,
  };

  mockBackendData = [
    {
      key: 'Option 1',
      disabled: true,
    },
    {
      key: 'Option 2',
      disabled: false,
    },
    {
      key: 'Option 3',
      disabled: false,
    },
    {
      key: 'Option 4',
      disabled: false,
    },
    {
      key: 'Option 5',
      disabled: false,
    },
    {
      key: 'Option 5',
      disabled: false,
    },
  ];
  mockClassificationList: {
    key: string;
    disabled: boolean;
  }[] = [];

  businessFormEdit = this.formBuilder.group({
    displayName: ['', [Validators.required]],
    businessName: ['', [Validators.required]],
    businessClassification: ['', [Validators.required]],
    contactPhoneNumber: ['', [Validators.required]],
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

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private modalService: ModalService
  ) {
    this.disableFormControls();
    this.displayClassificationMatches('');
    this.fillFormControls();
  }

  onEditClick(): void {
    this.toggleEditingStatus();
    this.enableFormControls();
  }

  onSaveClick(): void {
    if (this.businessFormEdit.invalid) {
      this.modalService.open(ModalInvalidFormComponent, {
        width: '420px',
        height: '250px',
      });
      return;
    }
    // MAKE VALIDATIONS
    this.toggleEditingStatus();
    this.disableFormControls();
  }

  onWriteValue(keyUp: KeyboardEvent): void {
    const inputValue = (keyUp.target as HTMLInputElement).value;
    this.displayClassificationMatches(inputValue.toLowerCase());
  }

  onValueDeleted() {
    this.mockClassificationList = [...this.mockBackendData];
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

  fillFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit
        .get(key)
        ?.setValue(
          `${this.mockBusinessInfo[key as keyof typeof this.mockBusinessInfo]}`
        );
    });
  }

  hasError = (controlName: string, errorName: string): boolean => {
    const control = this.businessFormEdit.get(controlName);
    return control ? control.hasError(errorName) : false;
  };

  displayClassificationMatches(pattern: string) {
    this.mockClassificationList = this.mockBackendData.filter(
      (classification) => classification.key.toLowerCase().match(pattern)
    );
  }
}
