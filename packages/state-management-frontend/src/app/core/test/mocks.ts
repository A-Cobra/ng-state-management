import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { CustomFormValidations } from '../utils/custom-form-validations';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input type="text" formControlName="testControl" />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TestFormComponent {
  constructor(private formBuilder: NonNullableFormBuilder) {}

  testForm: FormGroup = this.formBuilder.group({
    emailControl: ['', [CustomFormValidations.email]],
    nameControl: ['', [CustomFormValidations.namePattern]],
    passwordControl: ['', [CustomFormValidations.strongPassword]],
    cashControl: ['', [CustomFormValidations.floatNumber]],
    phoneControl: ['', [CustomFormValidations.onlyNumbers]],
    imgControl: ['', [CustomFormValidations.imageUrl]],
  });
}

export const WEAK_PASSWORD_ERROR: ValidationErrors = { weakPassword: true };

export const NOT_VALID_IMG_URL_ERROR: ValidationErrors = { notImageUrl: true };

export const RIMAC_NEVERA_URL =
  'https://web-cdn.rimac-automobili.com/wp-content/uploads/2021/05/31101405/intro_slider_07_optimised.jpg';
