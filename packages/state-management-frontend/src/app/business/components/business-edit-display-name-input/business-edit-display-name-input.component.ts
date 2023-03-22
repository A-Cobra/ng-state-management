import { Component, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'state-management-app-business-edit-display-name-input',
  templateUrl: './business-edit-display-name-input.component.html',
  styleUrls: ['./business-edit-display-name-input.component.scss'],
})
export class BusinessEditDisplayNameInputComponent {
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
