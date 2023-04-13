import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatNumberOrNumberRangeDirective } from '../directives/float-number-or-number-range.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['testControl']"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestFloatNumberDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['testControl']"
        [minValue]="-280"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestMinNumberRangeDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['testControl']"
        [maxValue]="180"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestMaxNumberRangeDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppFloatNumberOrNumberRange
        [reactiveFormControl]="testForm.controls['testControl']"
        [minValue]="-280"
        [maxValue]="180"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FloatNumberOrNumberRangeDirective],
})
export class TestNumberRangeDirectiveComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}
