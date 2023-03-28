import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'state-management-app-reactive-form-control-text-input',
  templateUrl: './reactive-form-control-text-input.component.html',
  styleUrls: ['./reactive-form-control-text-input.component.scss'],
})
export class ReactiveFormControlTextInputComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  controlName = 'displayName';
  @Input()
  displayText: string;
  @Input()
  label: string;
  @Input()
  inputType = 'text';
  @Input()
  required = true;
  @Input()
  staticDisplayText = false;
  @Input()
  maxLength = 1000;
  @Input()
  minLength = 0;
}
