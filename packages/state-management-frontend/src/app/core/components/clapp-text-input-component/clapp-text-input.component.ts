import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'state-management-app-clapp-text-input-component',
  templateUrl: './clapp-text-input.component.html',
  styleUrls: ['./clapp-text-input.component.scss'],
})
export class ClappTextInputComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  controlName: string;
  @Input()
  label: string;
  @Input()
  displayText: string;
  @Input()
  patternMessage: string;
  @Input()
  inputType: string;
  @Input()
  maxLength: number;
}
