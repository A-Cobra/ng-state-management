import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'state-management-app-reactive-form-control-text-input',
  templateUrl: './reactive-form-control-text-input.component.html',
  styleUrls: ['./reactive-form-control-text-input.component.scss'],
})
export class ReactiveFormControlTextInputComponent {
  @Input()
  controlName = 'displayName';
  @Input()
  displayText: string;
  @Input()
  hasError: (controlName: string, errorName: string) => boolean;
  @Input()
  label: string;
  @Input()
  parentForm: FormGroup;
  @Input()
  required = true;
}
