import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@clapp1/clapp-angular';
import { FormEditPayload } from '../../models/form-edit-payload.interface';
import { ModalInvalidFormComponent } from '../modal-invalid-form/modal-invalid-form.component';

@Component({
  selector: 'state-management-app-business-edit-form',
  templateUrl: './business-edit-form.component.html',
  styleUrls: ['./business-edit-form.component.scss'],
})
export class BusinessEditFormComponent implements OnInit {
  editing = false;

  @Input()
  id: number;

  @Input()
  businessData: {
    displayName: string;
    businessName: string;
    businessClassification: string;
    contactPhoneNumber: string;
    contactEmail: string;
    contactAddress: string;
    longitude: string;
    latitude: string;
    imgUrl: string;
    totalBranches: number;
  };

  @Input()
  classificationsBackendData: {
    key: string;
    disabled: boolean;
  }[] = [];

  mockClassificationList: {
    key: string;
    disabled: boolean;
  }[] = [];

  @Output()
  formSubmit = new EventEmitter<FormEditPayload>();

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
  }
  ngOnInit(): void {
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
    this.toggleEditingStatus();
    this.disableFormControls();
    const { businessName, contactEmail } = this.businessFormEdit.value;
    const payload: FormEditPayload = {
      businessName: businessName ?? '',
      contactEmail: contactEmail ?? '',
    };
    // MAKE VALIDATIONS
    // if(this.businessData == payload){
    //   console.log('EQUAL DATA CAN NOT BE UPDATED');
    //   return;
    //   // Show Modal that says the it can not update to the same value
    // }
    this.formSubmit.emit(payload);
  }

  onWriteValue(keyUp: KeyboardEvent): void {
    const inputValue = (keyUp.target as HTMLInputElement).value;
    this.displayClassificationMatches(inputValue.toLowerCase());
  }

  onValueDeleted() {
    this.mockClassificationList = [...this.classificationsBackendData];
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
          `${this.businessData[key as keyof typeof this.businessData]}`
        );
    });
  }

  hasError = (controlName: string, errorName: string): boolean => {
    const control = this.businessFormEdit.get(controlName);
    return control ? control.hasError(errorName) : false;
  };

  displayClassificationMatches(pattern: string) {
    this.mockClassificationList = this.classificationsBackendData.filter(
      (classification) => classification.key.toLowerCase().match(pattern)
    );
  }
}
