import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'state-management-app-reactive-form-text-input-component',
  templateUrl: './reactive-form-text-input.component.html',
  styleUrls: ['./reactive-form-text-input.component.scss'],
})
export class ReactiveFormTextInputComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  controlName: string;
  @Input()
  elementId: string;
  @Input()
  label: string;
  @Input()
  displayText: string;
  @Input()
  patternMessage: string;
  @Input()
  inputType = 'text';
  @Input()
  maxLength = 1000;
}
