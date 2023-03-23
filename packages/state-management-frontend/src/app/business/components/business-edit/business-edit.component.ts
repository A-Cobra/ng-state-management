import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'state-management-app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent {
  editing = false;

  mockBusinessInfo = {
    displayName: 'Business Display Name',
    businessName: 'Business Display Name',
    businessClassification: 'Business Display Name',
    contactPhoneNumber: 'Business Display Name',
    contactEmail: 'Business Display Name',
    contactAddress: 'Business Display Name',
    longitude: 'Business Display Name',
    latitude: 'Business Display Name',
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
    displayName: ['fasfafasfqqg', [Validators.required]],
    businessName: ['', [Validators.required]],
    businessClassification: ['', [Validators.required]],
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
    this.showMatches('');
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

  onWriteValue(keyUp: KeyboardEvent): void {
    const inputValue = (keyUp.target as HTMLInputElement).value;
    this.showMatches(inputValue.toLowerCase());
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

  hasError = (controlName: string, errorName: string): boolean => {
    const control = this.businessFormEdit.get(controlName);
    return control ? control.hasError(errorName) : false;
  };

  showMatches(pattern: string) {
    this.mockClassificationList = this.mockBackendData.filter(
      (classification) => classification.key.toLowerCase().match(pattern)
    );
  }
}
