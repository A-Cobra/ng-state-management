import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatNumberOrNumberRangeDirective } from '../../directives/float-number-or-number-range.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="control"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['control']"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestFloatNumberOrNumberRangeDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    control: new FormControl('895', { nonNullable: true }),
  });
}
