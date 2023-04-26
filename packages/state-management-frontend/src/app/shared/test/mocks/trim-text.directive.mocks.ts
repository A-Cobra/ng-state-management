import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrimTextDirective } from '../../directives/trim-text.directive';

@Component({
  template: `
    <form [formGroup]="testForm">
      <input
        type="text"
        formControlName="testControl"
        stateManagementAppTrimText
        [reactiveFormControl]="testForm.controls['testControl']"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, TrimTextDirective],
})
export class TrimTextMockComponent {
  testForm: FormGroup = new FormGroup({
    testControl: new FormControl('89123', { nonNullable: true }),
  });
}
