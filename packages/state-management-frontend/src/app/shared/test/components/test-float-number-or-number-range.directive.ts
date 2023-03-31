import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatNumberOrNumberRangeDirective } from '../../directives/float-number-or-number-range.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <!-- <input
        type="text"
        formControlName="testControl"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['testControl']"
      /> -->
      <input type="text" formControlName="testControl" />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestFloatNumberOrNumberRangeDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}
