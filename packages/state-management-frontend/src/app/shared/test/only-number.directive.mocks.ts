import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '../directives/only-number.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppOnlyNumber
        [reactiveFormControl]="testForm.controls['testControl']"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, OnlyNumberDirective],
})
export class TestOnlyNumberDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}
