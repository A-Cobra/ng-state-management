import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberDirective } from '../directives/phone-number.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppPhoneNumber
        [reactiveFormControl]="testForm.controls['testControl']"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, PhoneNumberDirective],
})
export class TestPhoneNumberDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}
